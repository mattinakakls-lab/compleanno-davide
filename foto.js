// =========================================================
// PAGINA FOTO - JAVASCRIPT
// =========================================================


// =========================================================
// ELEMENTI
// =========================================================

const photos = document.querySelectorAll(".photo-card img");

const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeButton = document.getElementById("lightboxClose");
const prevButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

const heartsButton = document.getElementById("heartsButton");
const starsButton = document.getElementById("starsButton");

const heartsContainer = document.getElementById("hearts");
const starsContainer = document.getElementById("stars");


// =========================================================
// VARIABILI
// =========================================================

let currentPhoto = 0;


// =========================================================
// APRI FOTO
// =========================================================

function openPhoto(index) {

    currentPhoto = index;

    const photo = photos[currentPhoto];

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;

    lightboxCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


// =========================================================
// CHIUDI FOTO
// =========================================================

function closePhoto() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


// =========================================================
// FOTO SUCCESSIVA
// =========================================================

function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    updateLightbox();
}


// =========================================================
// FOTO PRECEDENTE
// =========================================================

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    updateLightbox();
}


// =========================================================
// AGGIORNA LIGHTBOX
// =========================================================

function updateLightbox() {

    const photo = photos[currentPhoto];

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;

    lightboxCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;
}


// =========================================================
// CLICK SULLE FOTO
// =========================================================

photos.forEach((photo, index) => {

    photo.addEventListener("click", function () {

        openPhoto(index);

    });

});


// =========================================================
// PULSANTE CHIUDI
// =========================================================

closeButton.addEventListener("click", function () {

    closePhoto();

});


// =========================================================
// FOTO PRECEDENTE
// =========================================================

prevButton.addEventListener("click", function (event) {

    event.stopPropagation();

    previousPhoto();

});


// =========================================================
// FOTO SUCCESSIVA
// =========================================================

nextButton.addEventListener("click", function (event) {

    event.stopPropagation();

    nextPhoto();

});


// =========================================================
// CLICK SULLO SFONDO
// Chiude la foto se clicchi fuori
// =========================================================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closePhoto();

    }

});


// =========================================================
// TASTIERA
// =========================================================

document.addEventListener("keydown", function (event) {

    // Se il lightbox non è aperto
    if (!lightbox.classList.contains("active")) {
        return;
    }


    // Freccia destra

    if (event.key === "ArrowRight") {

        nextPhoto();

    }


    // Freccia sinistra

    if (event.key === "ArrowLeft") {

        previousPhoto();

    }


    // ESC

    if (event.key === "Escape") {

        closePhoto();

    }

});


// =========================================================
// CUORI 💖
// =========================================================

function cuori() {

    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("div");

        heart.classList.add("heart");

        heart.textContent = "❤️";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (18 + Math.random() * 25) + "px";

        heart.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        heart.style.animationDelay =
            Math.random() * 0.8 + "s";


        heartsContainer.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 6500);

    }

}


// =========================================================
// STELLINE ⭐
// =========================================================

function stelle() {

    for (let i = 0; i < 35; i++) {

        const star = document.createElement("div");

        star.classList.add("star");

        star.textContent = "⭐";

        star.style.left =
            Math.random() * 100 + "vw";

        star.style.fontSize =
            (14 + Math.random() * 22) + "px";

        star.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        star.style.animationDelay =
            Math.random() * 1 + "s";


        starsContainer.appendChild(star);


        setTimeout(() => {

            star.remove();

        }, 7500);

    }

}


// =========================================================
// PULSANTE CUORI
// =========================================================

if (heartsButton) {

    heartsButton.addEventListener("click", function () {

        cuori();

    });

}


// =========================================================
// PULSANTE STELLINE
// =========================================================

if (starsButton) {

    starsButton.addEventListener("click", function () {

        stelle();

    });

}


// =========================================================
// SUPPORTO SWIPE SU TELEFONO
// =========================================================

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener("touchstart", function (event) {

    touchStartX = event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", function (event) {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    // Swipe verso sinistra
    // → foto successiva

    if (difference > 50) {

        nextPhoto();

    }


    // Swipe verso destra
    // → foto precedente

    if (difference < -50) {

        previousPhoto();

    }

}