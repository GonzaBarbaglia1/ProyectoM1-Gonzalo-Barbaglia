const botonGenerar = document.getElementById("generar-paleta");
const contenedorPaleta = document.getElementById("paleta");

const opcionesPaleta = document.getElementById("opciones-paleta");
const opciones = document.querySelectorAll(".opcion");

const botonRgb = document.getElementById("btnRGB");
const botonHsl = document.getElementById("btnHSL");

let formatoSeleccionado = "rgb";
let coloresPaleta = []

function generarColorRgb() {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return {
        r: r,
        g: g,
        b: b
    };
}

function rgbAHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const diferencia = max - min;

        s = l > 0.5
            ? diferencia / (2 - max - min)
            : diferencia / (max + min);

        switch (max) {

            case r:
                h = (g - b) / diferencia + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / diferencia + 2;
                break;

            case b:
                h = (r - g) / diferencia + 4;
                break;
        }

        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const luz = Math.round(l * 100);

    return {
        h: h,
        s: s,
        l: luz
    };
}


botonGenerar.addEventListener("click", function () {

    opcionesPaleta.classList.toggle("mostrar");

});

opcionesPaleta.classList.remove("mostrar");

opciones.forEach(function (opcion) {

    opcion.addEventListener("click", function () {

        const cantidadColores = Number(opcion.dataset.cantidad);

        contenedorPaleta.innerHTML = "";

        for (let i = 0; i < cantidadColores; i++) {

            let color;

            if (coloresPaleta[i] && coloresPaleta[i].bloqueado) {
                color = coloresPaleta[i];
            } else {
                color = {
                    ...generarColorRgb(),
                    bloqueado: false
                };
            }

            coloresPaleta[i] = color;

            const colorRgb = `rgb(${color.r}, ${color.g}, ${color.b})`;

            const hsl = rgbAHsl(color.r, color.g, color.b);

            const colorHsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

            const bloqueColor = document.createElement("div");
            bloqueColor.classList.add("bloque-color");

            const muestraColor = document.createElement("div");
            muestraColor.classList.add("muestra-color");

            muestraColor.style.backgroundColor = colorRgb;

            const informacionColor = document.createElement("div");
            informacionColor.classList.add("informacion-color");

     informacionColor.innerHTML = `
        <p class="hsl">HSL: ${colorHsl}</p>
        <p class="rgb">RGB: ${colorRgb}</p>
            `;

            const textoRgb = informacionColor.querySelector(".rgb");
            const textoHsl = informacionColor.querySelector(".hsl");

            textoRgb.addEventListener("click", function () {
                navigator.clipboard.writeText(colorRgb);
             

             textoRgb.textContent = "¡Codigo Copiado!"

            setTimeout(function () {
        textoRgb.textContent = `RGB: ${colorRgb}`;
    }, 900)
});

             textoHsl.addEventListener("click", function () {
               navigator.clipboard.writeText(colorHsl);
            
    textoHsl.textContent = "¡Codigo Copiado!";

    setTimeout(function () {
        textoHsl.textContent = `HSL: ${colorHsl}`;
    }, 900) 
});

            const botonBloquear = document.createElement("button");
            botonBloquear.classList.add("boton-bloquear");
            botonBloquear.textContent = color.bloqueado ? "🔒" : "🔓";

            bloqueColor.classList.toggle("bloqueado", color.bloqueado);

            botonBloquear.addEventListener("click", function () {
                color.bloqueado = !color.bloqueado;

                bloqueColor.classList.toggle("bloqueado", color.bloqueado);
                botonBloquear.textContent = color.bloqueado ? "🔒" : "🔓";
            });

            informacionColor.appendChild(botonBloquear);

            bloqueColor.appendChild(muestraColor);
            bloqueColor.appendChild(informacionColor);

            contenedorPaleta.appendChild(bloqueColor);
        }

        actualizarFormato();
        opcionesPaleta.classList.remove("mostrar");
    });
});

function actualizarFormato() {

    const textosRgb = document.querySelectorAll(".rgb");
    const textosHsl = document.querySelectorAll(".hsl");

    if (formatoSeleccionado === "rgb") {

        textosRgb.forEach(function (texto) {
            texto.style.display = "block";
        });

        textosHsl.forEach(function (texto) {
            texto.style.display = "none";
        });

    } else {

        textosRgb.forEach(function (texto) {
            texto.style.display = "none";
        });

        textosHsl.forEach(function (texto) {
            texto.style.display = "block";
        });
    }
}

botonRgb.addEventListener("click", function () {

    formatoSeleccionado = "rgb";
    actualizarFormato();

});
botonHsl.addEventListener("click", function () {

    formatoSeleccionado = "hsl";
    actualizarFormato();

});