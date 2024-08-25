const enviarFormulario = document.getElementById('enviar_form');

enviarFormulario.addEventListener("click", (a) => {
    a.preventDefault()
    let nombre = document.getElementById("input_nombre");
    let valor = nombre.value;
    console.log(valor);
});