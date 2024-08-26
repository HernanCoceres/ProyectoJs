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
    const nombre = inputNombre.value.trim();
    if (nombre) {
        linkIniciarSesion.textContent = nombre;
        panelSesion.style.display = "none";
    } else {
        alert("Ingresa un nombre");
    }
});

/*Seccion del carrito*/
const botonesComprar = document.querySelectorAll(".boton_comprar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});

/*funcion agregar cosas para el carrito*/
function agregarAlCarrito(event) {
    const boton = event.target;
    const prendaContenedor = boton.closest(".sub_contenedor-ropa");
    const nombrePrenda = prendaContenedor.querySelector(".informacion_prenda p:nth-child(1)").textContent;
    const precioPrenda = parseFloat(prendaContenedor.querySelector(".informacion_prenda p:nth-child(2)").textContent.replace('$', '').trim());
    const prendaExistente = carrito.find(item => item.nombre === nombrePrenda);
/*validaciones si la prenda esta o no esta */
    if (prendaExistente) {
        prendaExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombrePrenda,
            precio: precioPrenda,
            cantidad: 1
        });}

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

/*Para mostrar en el html*/
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio} x${item.cantidad}`;
/*boton para borra elemento*/
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}

/*calculo para el total*/
function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    document.getElementById("total").textContent = "Total: $" + total;
}

/*boton eliminar aaccion */
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
/*para vaciar el array del carrito */
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

actualizarCarrito();