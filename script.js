// ==========================================
// 1. INICIAR ANIMACIONES DE SCROLL (AOS)
// ==========================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ==========================================
// 2. LÓGICA DEL SLIDER (MOVER LA BARRA)
// ==========================================
const slider = document.getElementById("sliderRange");
const afterImage = document.querySelector(".after-image");
const sliderButton = document.querySelector(".slider-button");

// Función que mueve visualmente la barra y la foto
function moveSlider() {
    const sliderVal = slider.value;
    // Ancho de la imagen superior (la recortada)
    afterImage.style.width = sliderVal + "%";
    // Posición del botón central
    sliderButton.style.left = sliderVal + "%";
}

// Escuchamos el movimiento (ratón o dedo)
slider.addEventListener("input", moveSlider);
slider.addEventListener("change", moveSlider);


// ==========================================
// 3. LÓGICA PARA CAMBIAR ENTRE FOTOS (NUEVO)
// ==========================================

// --- LISTA DE TUS FOTOS (CÁMBIALAS AQUÍ) ---
const slides = [
    {
        // Foto 1 (La que sale al principio)
        before: 'imagenes/antes.webp',
        after: 'imagenes/despues.webp'
    },
    {
        // Foto 2
        before: 'imagenes/antes2.webp', // <--- Pon aquí la ruta real
        after: 'imagenes/despues2.webp'
    },
    {
        // Foto 3
        before: 'imagenes/antes3.webp', // <--- Pon aquí la ruta real
        after: 'imagenes/despues3.webp'
    }
    // Puedes añadir más bloques {} con comas si quieres más fotos
];

let currentSlide = 0; // Empezamos en la primera (índice 0)

// Seleccionamos los elementos del HTML que vamos a cambiar
const imgBefore = document.getElementById('imgBefore');
const imgAfter = document.getElementById('imgAfter');
const counter = document.getElementById('slide-counter');

// Función principal que actualiza las fotos y el contador
function updateImages() {
    // 1. Cambiamos la ruta (src) de las imágenes
    imgBefore.src = slides[currentSlide].before;
    imgAfter.src = slides[currentSlide].after;

    // 2. Actualizamos el texto del contador (Ej: "2 / 3")
    counter.innerText = `${currentSlide + 1} / ${slides.length}`;

    // 3. REINICIAR LA BARRA AL CENTRO (Opcional, pero queda mejor)
    slider.value = 50;
    moveSlider(); // Llamamos a la función de arriba para que se coloque al medio
}

// Función para el botón "Siguiente"
function nextSlide() {
    currentSlide++;
    // Si llegamos al final, volvemos al principio (bucle infinito)
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    updateImages();
}

// Función para el botón "Anterior"
function prevSlide() {
    currentSlide--;
    // Si estamos en el principio y damos atrás, vamos a la última
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    updateImages();
}

// Inicializamos el contador nada más cargar la página
// (Para asegurar que ponga "1 / 3" si tienes 3 fotos)
if (counter) {
    counter.innerText = `1 / ${slides.length}`;
}