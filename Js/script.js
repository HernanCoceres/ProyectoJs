const nombre = prompt("Hola, ¿como es tu nombre?");
alert('Bienvenid@ '+nombre+' a este programa en donde podrás hacer tus operaciones simples de matematicas, presiona "aceptar" para empezar...' );
//Seleccion de operacion.
let typeOfoperation = prompt("¿Que operacion queres realizar? ingresa el numero que corresponda a la operacion que queres seleccionar. 1 = sumar // 2 = restar // 3 = multiplicar // 4 = dividir");
//Seleccion de numeros.
let number1 = prompt("Elegi el primer numero");
let number2 = prompt("Elegi el segundo numero");
//Funciones de operaciones.
function sumar() {
    let result = parseInt(number1)+parseInt(number2);
    return result;
};

function restar() {
    let result = parseInt(number1)-parseInt(number2);
    return result;
};

function multiplicar() {
    let result = parseInt(number1)*parseInt(number2);
    return result;
};

function dividir() {
    let result = parseInt(number1)/parseInt(number2);
    return result;
};
//Calculo.
if (typeOfoperation == 1) {
    document.write("El resultado de tu operacion es: "+sumar()+"<br> Si te gustaria realizar otra operacion, recarga la pagina. Gracias por utilizar el programa");
}else if (typeOfoperation == 2) {
    document.write("El resultado de tu operacion es: "+restar()+"<br> Si te gustaria realizar otra operacion, recarga la pagina. Gracias por utilizar el programa");
}else if (typeOfoperation == 3) {
    document.write("El resultado de tu operacion es: "+multiplicar()+"<br> Si te gustaria realizar otra operacion, recarga la pagina. Gracias por utilizar el programa");
}else if (typeOfoperation == 4) {
    document.write("El resultado de tu operacion es: "+dividir()+"<br> Si te gustaria realizar otra operacion, recarga la pagina. Gracias por utilizar el programa");
}else{document.write("La opcion elegida es incorrecta, debes seleccionar un numero del 1 al 4.")}
