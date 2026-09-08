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

            bloqueColor.style.backgroundColor = color;
            bloqueColor.style.width = "120px";
            bloqueColor.style.height = "180px";

            const codigoColor = document.createElement("p");

            codigoColor.innerHTML = `
                HEX: ${color}<br>
                RGB: ${colorRgb}
            `;

            bloqueColor.appendChild(codigoColor);

            contenedorPaleta.appendChild(bloqueColor);
        }

        opcionesPaleta.classList.remove("mostrar");

    });

});