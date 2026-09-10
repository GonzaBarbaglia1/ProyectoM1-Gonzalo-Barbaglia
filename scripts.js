const botonGenerar = document.getElementById("generar-paleta");
const contenedorPaleta = document.getElementById("paleta");

const opcionesPaleta = document.getElementById("opciones-paleta");
const opciones = document.querySelectorAll(".opcion");

let formatoSeleccionado = "rgb";


// Generar un color RGB aleatorio
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


// Convertir RGB a HSL
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


// Botón Generar
botonGenerar.addEventListener("click", function () {

    opcionesPaleta.classList.toggle("mostrar");

});


// Seleccionar cantidad de colores
opciones.forEach(function (opcion) {

    opcion.addEventListener("click", function () {

        const cantidadColores = Number(opcion.dataset.cantidad);

        contenedorPaleta.innerHTML = "";

        for (let i = 0; i < cantidadColores; i++) {

            const color = generarColorRgb();

            const colorRgb = `rgb(${color.r}, ${color.g}, ${color.b})`;

            const hsl = rgbAHsl(color.r, color.g, color.b);

            const colorHsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

            const bloqueColor = document.createElement("div");
            bloqueColor.classList.add("bloque-color");


            // Muestra del color
            const muestraColor = document.createElement("div");
            muestraColor.classList.add("muestra-color");

            muestraColor.style.backgroundColor = colorRgb;


            // Información del color
            const informacionColor = document.createElement("div");
            informacionColor.classList.add("informacion-color");

            informacionColor.innerHTML = `
                <p class="hsl">HSL: ${colorHsl}</p>
                <p class="rgb">RGB: ${colorRgb}</p>
            `;


            // Botón bloquear
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

            });


            informacionColor.appendChild(botonBloquear);

            bloqueColor.appendChild(muestraColor);
            bloqueColor.appendChild(informacionColor);

            contenedorPaleta.appendChild(bloqueColor);
        }

    });

});
