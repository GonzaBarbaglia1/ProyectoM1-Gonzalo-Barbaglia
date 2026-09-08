const botonGenerar = document.getElementById("generar-paleta");
const contenedorPaleta = document.getElementById("paleta");

const opcionesPaleta = document.getElementById("opciones-paleta");
const opciones = document.querySelectorAll(".opcion");


function generarColor() {

    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {

        const indice = Math.floor(Math.random() * caracteres.length);

        color += caracteres[indice];
    }

    return color;
}


function hexARgb(hex) {

    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}


botonGenerar.addEventListener("click", function () {

    opcionesPaleta.classList.toggle("mostrar");

});


opciones.forEach(function (opcion) {

    opcion.addEventListener("click", function () {

        const cantidadColores = Number(opcion.dataset.cantidad);

        contenedorPaleta.innerHTML = "";

        for (let i = 0; i < cantidadColores; i++) {

        const color = generarColor();
        const colorRgb = hexARgb(color);

        const bloqueColor = document.createElement("div");
bloqueColor.classList.add("bloque-color");

const muestraColor = document.createElement("div");
muestraColor.classList.add("muestra-color");
muestraColor.style.backgroundColor = color;


const informacionColor = document.createElement("div");
informacionColor.classList.add("informacion-color");

informacionColor.innerHTML = `
    <p class="hex">HEX: ${color}</p>
    <p class="rgb">RGB: ${colorRgb}</p>
`;


bloqueColor.appendChild(muestraColor);
bloqueColor.appendChild(informacionColor);

contenedorPaleta.appendChild(bloqueColor);
        }
    });
}); 

bloqueColor.classList.add("bloque-color");
bloqueColor.classList.add("bloqueado");

const botonBloquear = document.createElement("button");

botonBloquear.textContent = "🔓";
botonBloquear.classList.add("boton-bloquear");
botonBloquear.addEventListener("click", function () {

    bloqueColor.classList.toggle("bloqueado");

    if (bloqueColor.classList.contains("bloqueado")) {
        botonBloquear.textContent = "🔒";
    } else {
        botonBloquear.textContent = "🔓";
    }
    informacionColor.appendChild(botonBloquear);
});