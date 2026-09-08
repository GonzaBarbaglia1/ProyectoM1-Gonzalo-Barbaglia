const cantidades = [6, 8, 9];

const botonGenerar = document.getElementById("generar-paleta");
const contenedorPaleta = document.getElementById("paleta");


function generarColor() {

    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {

        const indice = Math.floor(Math.random() * caracteres.length);

        color += caracteres[indice];
    }

    return color;
}


botonGenerar.addEventListener("click", function () {

    contenedorPaleta.innerHTML = "";

    const indiceAleatorio = Math.floor(Math.random() * cantidades.length);

    const cantidadColores = cantidades[indiceAleatorio];

    console.log("Cantidad de colores:", cantidadColores);

    for (let i = 0; i < cantidadColores; i++) {

        const color = generarColor();

        const bloqueColor = document.createElement("div");
        bloqueColor.style.backgroundColor = color;
        bloqueColor.style.width = "80px";
bloqueColor.style.height = "150px";
contenedorPaleta.appendChild(bloqueColor);
    }

});

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