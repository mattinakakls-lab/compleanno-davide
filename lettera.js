/* =========================================================
   LETTERA DI DAVIDE ❤️
   BUSTA → APERTURA → LETTERA → SCRITTURA
========================================================= */


/* =========================================================
   ELEMENTI
========================================================= */

const envelopeScreen = document.getElementById("envelopeScreen");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const heartEnvelope = document.getElementById("heartEnvelope");

const openLetterButton = document.getElementById("openLetterButton");

const letterTransition = document.getElementById("letterTransition");
const letterScreen = document.getElementById("letterScreen");

const letterContent = document.getElementById("letterContent");

const backToEnvelope = document.getElementById("backToEnvelope");


/* =========================================================
   STATO
========================================================= */

let letterOpened = false;
let typingTimer = null;


/* =========================================================
   APERTURA LETTERA
========================================================= */

function openLetter() {

    // Evita di aprire più volte
    if (letterOpened) {
        return;
    }

    letterOpened = true;

    document.body.classList.add("letter-opening");

    /*
        Piccola vibrazione se il dispositivo la supporta.
        Non è obbligatoria e non dà errore su PC.
    */

    if (navigator.vibrate) {
        navigator.vibrate(30);
    }


    /*
        Dopo l'animazione della busta:
        - nascondiamo la schermata iniziale
        - mostriamo la lettera
    */

    setTimeout(() => {

        envelopeScreen.style.display = "none";

        letterScreen.style.display = "flex";

        letterScreen.setAttribute("aria-hidden", "false");

        /*
            Facciamo partire la transizione della lettera
            dopo che il browser ha registrato display:flex.
        */

        requestAnimationFrame(() => {

            letterScreen.style.opacity = "1";

        });

    }, 1100);


    /*
        Togliamo la schermata di transizione
        dopo che il cuore è esploso.
    */

    setTimeout(() => {

        letterTransition.style.opacity = "0";

        letterTransition.style.visibility = "hidden";

        letterTransition.style.pointerEvents = "none";

    }, 1650);


    /*
        Dopo che la carta è comparsa,
        iniziamo la scrittura.
    */

    setTimeout(() => {

        prepareLetterWriting();

        startLetterWriting();

    }, 2100);


    /*
        Mostra il pulsante per tornare indietro.
    */

    setTimeout(() => {

        backToEnvelope.style.display = "block";

    }, 3000);

}


/* =========================================================
   CLICK SULLA BUSTA
========================================================= */

heartEnvelope.addEventListener("click", openLetter);


/* =========================================================
   CLICK SUL PULSANTE
========================================================= */

openLetterButton.addEventListener("click", openLetter);


/* =========================================================
   TASTIERA
   ENTER / SPAZIO PER APRIRE LA BUSTA
========================================================= */

heartEnvelope.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        openLetter();

    }

});


/* =========================================================
   EFFETTO SCRITTURA
========================================================= */

/*
    Questa funzione prende il testo della lettera
    e trasforma ogni carattere in uno <span>.

    In questo modo possiamo far apparire ogni singola
    lettera progressivamente senza perdere:
    - paragrafi
    - titoli
    - emoji
    - <br>
*/


function prepareLetterWriting() {

    /*
        Elementi che vogliamo animare.
    */

    const elements = letterContent.querySelectorAll(
        "p, h3"
    );


    elements.forEach(element => {

        /*
            Evitiamo di preparare nuovamente il testo
            se la funzione viene richiamata.
        */

        if (element.dataset.prepared === "true") {
            return;
        }

        element.dataset.prepared = "true";


        /*
            Trasformiamo i nodi testuali.
        */

        wrapTextNodes(element);

    });

}


/* =========================================================
   TRASFORMA I CARATTERI IN SPAN
========================================================= */

function wrapTextNodes(element) {

    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
    );


    const textNodes = [];

    let node;

    while (
        node = walker.nextNode()
    ) {

        textNodes.push(node);

    }


    textNodes.forEach(textNode => {

        /*
            Se non c'è testo non facciamo niente.
        */

        if (!textNode.nodeValue.trim()) {
            return;
        }


        const fragment = document.createDocumentFragment();

        const text = textNode.nodeValue;


        /*
            Creiamo uno span per ogni carattere.
        */

        [...text].forEach(character => {

            const span = document.createElement("span");

            span.classList.add("typing-character");

            span.textContent = character;

            fragment.appendChild(span);

        });


        textNode.parentNode.replaceChild(
            fragment,
            textNode
        );

    });

}


/* =========================================================
   SCRITTURA PROGRESSIVA
========================================================= */

function startLetterWriting() {

    /*
        Se c'è già un timer lo cancelliamo.
    */

    if (typingTimer) {

        clearTimeout(typingTimer);

    }


    const characters = letterContent.querySelectorAll(
        ".typing-character"
    );


    let currentCharacter = 0;


    /*
        Tutti i caratteri partono invisibili.
    */

    characters.forEach(character => {

        character.style.opacity = "0";

        character.style.transition =
            "opacity 0.05s ease";

    });


    /*
        Funzione ricorsiva.
    */

    function writeNextCharacter() {

        if (
            currentCharacter >=
            characters.length
        ) {

            /*
                La scrittura è terminata.
            */

            showFinishedLetter();

            return;

        }


        const character =
            characters[currentCharacter];


        character.style.opacity = "1";


        /*
            Velocità di scrittura.
        */

        let speed = 18;


        /*
            Spazi più veloci.
        */

        if (
            character.textContent === " "
        ) {

            speed = 8;

        }


        /*
            Piccola pausa dopo la punteggiatura.
            Questo rende l'effetto meno "robotico".
        */

        if (
            character.textContent === "." ||
            character.textContent === "!" ||
            character.textContent === "?"
        ) {

            speed = 250;

        }


        if (
            character.textContent === "," ||
            character.textContent === ";"
        ) {

            speed = 120;

        }


        currentCharacter++;


        typingTimer = setTimeout(
            writeNextCharacter,
            speed
        );

    }


    /*
        Facciamo partire la scrittura.
    */

    writeNextCharacter();

}


/* =========================================================
   FINE DELLA SCRITTURA
========================================================= */

function showFinishedLetter() {

    document.body.classList.add(
        "letter-writing-finished"
    );


    /*
        Piccolo effetto finale sulla firma.
    */

    const signature =
        document.querySelector(".signature");


    if (signature) {

        signature.classList.add(
            "signature-finished"
        );

    }

}


/* =========================================================
   TORNA ALLA BUSTA
========================================================= */

backToEnvelope.addEventListener(
    "click",
    resetLetter
);


function resetLetter() {

    /*
        Fermiamo eventuale scrittura.
    */

    if (typingTimer) {

        clearTimeout(typingTimer);

        typingTimer = null;

    }


    letterOpened = false;


    /*
        Rimuoviamo gli stati.
    */

    document.body.classList.remove(
        "letter-opening"
    );

    document.body.classList.remove(
        "letter-writing-finished"
    );


    /*
        Nascondiamo nuovamente la lettera.
    */

    letterScreen.style.display = "none";

    letterScreen.style.opacity = "0";

    letterScreen.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
        Mostriamo nuovamente la busta.
    */

    envelopeScreen.style.display = "flex";

    envelopeScreen.style.opacity = "1";

    envelopeScreen.style.transform =
        "scale(1) translateY(0)";


    /*
        Nascondiamo il pulsante.
    */

    backToEnvelope.style.display = "none";


    /*
        Ripristiniamo la transizione.
    */

    letterTransition.style.opacity = "0";

    letterTransition.style.visibility =
        "hidden";


    /*
        IMPORTANTE:
        ripristiniamo il testo originale
        eliminando gli span creati dal
        sistema di scrittura.
    */

    restoreOriginalLetter();


    /*
        Piccola pausa prima di poter riaprire.
    */

    setTimeout(() => {

        heartEnvelope.style.transform = "";

    }, 50);

}


/* =========================================================
   RIPRISTINA IL TESTO ORIGINALE
========================================================= */

function restoreOriginalLetter() {

    /*
        Per non perdere il testo originale,
        ricarichiamo la pagina solo se necessario.

        Ma prima proviamo a ricostruire gli span.
    */

    const characters =
        letterContent.querySelectorAll(
            ".typing-character"
        );


    if (!characters.length) {
        return;
    }


    /*
        Per ogni contenitore:
        sostituiamo gli span con il loro testo.
    */

    const animatedElements =
        letterContent.querySelectorAll(
            "p, h3"
        );


    animatedElements.forEach(element => {

        if (
            element.dataset.prepared === "true"
        ) {

            /*
                Ricostruiamo il testo mantenendo
                eventuali <br>.
            */

            const walker =
                document.createTreeWalker(
                    element,
                    NodeFilter.SHOW_TEXT
                );

            /*
                Gli span sono nodi separati.
                Li raccogliamo e li sostituiamo
                con il carattere corrispondente.
            */

            const spans =
                element.querySelectorAll(
                    ".typing-character"
                );


            spans.forEach(span => {

                const textNode =
                    document.createTextNode(
                        span.textContent
                    );

                span.replaceWith(textNode);

            });


            element.dataset.prepared = "false";

        }

    });

}


/* =========================================================
   CUORI LATERALI
========================================================= */

const sideHearts =
    document.querySelector(".side-hearts");


function spawnSideHeart() {

    if (!sideHearts) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.classList.add(
        "side-heart"
    );


    /*
        Alterniamo diversi simboli
        per non avere sempre lo stesso cuore.
    */

    const hearts = [
        "♥",
        "♡",
        "❤",
        "💕",
        "✦"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];


    /*
        Posizione casuale.
    */

    heart.style.left =
        (5 + Math.random() * 90) + "vw";


    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";


    heart.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    /*
        Leggera variazione della trasparenza.
    */

    heart.style.opacity =
        (0.4 + Math.random() * 0.5);


    sideHearts.appendChild(heart);


    /*
        Rimuoviamo il cuore dopo l'animazione.
    */

    setTimeout(() => {

        heart.remove();

    }, 7000);

}


/*
    Generazione continua dei cuori.
*/

setInterval(
    spawnSideHeart,
    650
);


/* =========================================================
   PRIMI CUORI
========================================================= */

for (let i = 0; i < 6; i++) {

    setTimeout(
        spawnSideHeart,
        i * 400
    );

}