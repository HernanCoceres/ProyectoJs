const linkIniciarSesion = document.getElementById("iniciar_sesion");
const panelSesion = document.querySelector(".panel_sesion");
const botonEnviar = document.getElementById("enviar");
const inputNombre = document.getElementById("input_nombre");

/**Para mostrar el formulario **/
linkIniciarSesion.addEventListener("click", () => {
    panelSesion.style.display = "block";
});

/**condicion por si esta vacio**/
botonEnviar.addEventListener("click", () => {
    const nombre = inputNombre.value;
    if (nombre) {
        linkIniciarSesion.textContent = nombre;
        panelSesion.style.display = "none";
    } else {
        alert("Ingresa un nombre");
    }
});

/* Seccion del carrito */
const botonesComprar = document.querySelectorAll(".boton_comprar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const botonCarrito = document.getElementById("boton_carrito");
const seccionCarrito = document.getElementById("seccion_carrito");
const finalizarCompra = document.getElementById("finalizar_compra");

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});

/* Mostrar/Ocultar carrito */
botonCarrito.addEventListener("click", () => {
    if (seccionCarrito.style.display === "none") {
      seccionCarrito.style.display = "block";
    } else {
      seccionCarrito.style.display = "none";
    }
});

/* Funcion agregar cosas para el carrito */
function agregarAlCarrito(event) {
    const boton = event.target;
    const prendaContenedor = boton.closest(".sub_contenedor-ropa");
    const nombrePrenda = prendaContenedor.querySelector(".informacion_prenda p:nth-child(1)").textContent;
    const precioPrenda = parseFloat(prendaContenedor.querySelector(".informacion_prenda p:nth-child(2)").textContent.replace('$', ''));
    const prendaExistente = carrito.find(item => item.nombre === nombrePrenda);
    swal({
        title: "¡Agregado al carrito!",
        icon: "success",
        button: false,
        timer: 1200,
      });
    
    /* Por si la prenda esta o no esta */
    if (prendaExistente) {
        prendaExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombrePrenda,
            precio: precioPrenda,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

/* Para mostrar en el html */
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista_carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio} x${item.cantidad}`;
        /* Botón para borrar elemento */
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton_eliminar");
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);
    });

    actualizarTotal();

    if (carrito.length > 0) {
        finalizarCompra.style.display = "block";
    } else {
        finalizarCompra.style.display = "none";
    }
}

/* Calculo para el total */
function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    document.getElementById("total").textContent = "Total: $" + total;
}

/* Botón eliminar*/
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

/* Para vaciar el array del carrito */
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

/* Finalizar la compra*/
finalizarCompra.addEventListener("click", async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                carrito: carrito,
                total: calcularTotal(),
                nombreCliente: inputNombre.value
            })
        });

        if (!response.ok) {
            throw new Error('Fallo al enviar la compra al servidor.');
        }

        const result = await response.json();
        console.log('Compra realizada con éxito:', result);
        vaciarCarrito();
        swal({
            title: "¡Compra finalizada!",
            text: "Gracias, que disfrutes tu compra",
            icon: "success",
            button: "Cerrar",
            timer: 2000,
        });

    } catch (error) {
        console.error("Error al enviar los datos:", error);
        swal({
            title: "Error",
            text: "Hubo un problema al finalizar la compra. Intentalo nuevamente.",
            icon: "error",
            button: "Cerrar",
            timer: 2000,
        });
    }
});

function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

actualizarCarrito();