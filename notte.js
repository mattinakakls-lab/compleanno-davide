// ===============================
// MODALITÀ NOTTE 🌙
// ===============================


// ===============================
// MESSAGGIO STELLE ⭐
// ===============================

const button = document.getElementById("starsButton");
const message = document.getElementById("message");

if (button && message) {

    button.addEventListener("click", () => {

        message.classList.add("show");

        button.innerHTML = "❤️ CHE BELLINE LE STELLINEE";

    });

}



// ===============================
// LUNA CLICCABILE 🌙
// ===============================

const moon = document.querySelector(".moon");

if (moon) {

    moon.addEventListener("click", () => {

        moon.style.transform = "scale(1.15)";

        moon.style.boxShadow =
            "0 0 50px #fff5c7";

        setTimeout(() => {

            alert(
                "🌙  ️"
            );

        }, 300);

    });

}



// ===============================
// STELLE NORMALI CLICCABILI ⭐
// ===============================

const stars = document.querySelectorAll(".stars span");

let frasi = [

    "❤️ ",

    "💫 ",

    "🌙  ",

    "🌟" ,

];


stars.forEach(star => {

    star.addEventListener("click", () => {

        alert(
            frasi[
                Math.floor(Math.random() * frasi.length)
            ]
        );

    });

});



// ===============================
// STELLE DELLA NOSTRA STORIA 🌌
// ===============================

const storyStars =
    document.querySelectorAll(".story-star");

const storyModal =
    document.getElementById("story-modal");

const storyImage =
    document.getElementById("story-image");

const storyDate =
    document.getElementById("story-date");

const storyTitle =
    document.getElementById("story-title");

const storyText =
    document.getElementById("story-text");

const closeStory =
    document.getElementById("close-story");

const nextStory =
    document.getElementById("next-story");


// indice della stella attualmente aperta

let currentStory = 0;



// ===============================
// APRI UNA STORIA ⭐
// ===============================

function openStory(index) {

    const star = storyStars[index];

    if (!star) {
        return;
    }


    const date =
        star.dataset.date;

    const title =
        star.dataset.title;

    const text =
        star.dataset.text;

    const image =
        star.dataset.image;


    storyDate.textContent = date;

    storyTitle.textContent = title;

    storyText.textContent = text;


    // piccola animazione della foto

    storyImage.style.opacity = "0";

    storyImage.style.transform =
        "scale(1.05)";


    setTimeout(() => {

        storyImage.src = image;

        storyImage.style.opacity = "1";

        storyImage.style.transform =
            "scale(1)";

    }, 200);


    storyModal.classList.add("show");

    currentStory = index;


    // Se è l'ultima storia,
    // cambiamo il testo del pulsante

    if (currentStory === storyStars.length - 1) {

        nextStory.innerHTML =
            "❤️ Torna alle stelle";

    } else {

        nextStory.innerHTML =
            "✨ Continua";

    }

}



// ===============================
// CLICK SULLE STELLE DELLA STORIA
// ===============================

storyStars.forEach((star, index) => {

    star.addEventListener("click", () => {

        openStory(index);

    });

});



// ===============================
// CHIUDI LA STORIA ❌
// ===============================

if (closeStory) {

    closeStory.addEventListener("click", () => {

        storyModal.classList.remove("show");

    });

}



// ===============================
// CLICK FUORI DAL BOX
// ===============================

if (storyModal) {

    storyModal.addEventListener("click", (event) => {

        if (event.target === storyModal) {

            storyModal.classList.remove("show");

        }

    });

}



// ===============================
// CONTINUA → STORIA SUCCESSIVA ✨
// ===============================

if (nextStory) {

    nextStory.addEventListener("click", () => {


        // Se siamo sull'ultima storia

        if (
            currentStory ===
            storyStars.length - 1
        ) {

            storyModal.classList.remove("show");

            return;

        }


        // Passa alla storia successiva

        currentStory++;

        openStory(currentStory);

    });

}



// ===============================
// TASTO ESC PER CHIUDERE
// ===============================

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        storyModal.classList.contains("show")
    ) {

        storyModal.classList.remove("show");

    }

});



// ===============================
// CREA STELLA CON DESIDERIO ✨
// ===============================

function makeWish() {

    let input =
        document.getElementById("wish");


    if (!input) {

        return;

    }


    if (input.value.trim() === "") {

        alert("Scrivi un desiderio ✨");

        return;

    }


    let newStar =
        document.createElement("span");


    newStar.innerHTML = "⭐";


    newStar.style.position =
        "absolute";


    newStar.style.left =
        Math.random() * 90 + "%";


    newStar.style.top =
        Math.random() * 60 + "%";


    newStar.style.fontSize =
        "35px";


    newStar.style.zIndex =
        "10";


    newStar.style.filter =
        "drop-shadow(0 0 10px white)";


    document
        .querySelector(".night-sky")
        .appendChild(newStar);


    input.value = "";


    alert(
        "✨ Il tuo desiderio è diventato una stella ❤️"
    );

}



// ===============================
// STELLE CADENTI EXTRA ☄️
// ===============================

function creaStellaCadente() {

    let star =
        document.createElement("div");


    star.className = "shoot";


    star.style.top =
        Math.random() * 40 + "%";


    star.style.left =
        Math.random() * 100 + "%";


    document
        .querySelector(".night-sky")
        .appendChild(star);


    setTimeout(() => {

        star.remove();

    }, 5000);

}


setInterval(creaStellaCadente, 7000);



// ===============================
// PIANETI 🪐
// ===============================

function openPlanet(tipo) {

    let testo = "";


    switch (tipo) {


        case "foto":

            testo =
                "🌍 Qui ci sono i nostri momenti più belli 📸";

            break;


        case "lettera":

            testo =
                "🪐 Una dedica speciale solo per te 💌";

            break;


        case "dedica":

            testo =
                "🌕 Anche guardando la luna penso a te ❤️";

            break;


        case "video":

            testo =
                "☄️ Un video pieno di ricordi 🎥";

            break;

    }


    alert(testo);

}



// ===============================
// TELESCOPIO 🔭
// ===============================

// Pronto per la prossima sorpresa ❤️