/* =========================================================
   TORTA DI COMPLEANNO
   18 CANDELINE + FUMO + CONFETTI + PALLONCINI
========================================================= */


/* =========================================================
   ELEMENTI HTML / SVG
========================================================= */

const svg = document.getElementById("cakeSVG");

const candlesLayer =
    document.getElementById("candlesLayer");

const candleGlowLayer =
    document.getElementById("candleGlowLayer");

const candleCountElement =
    document.getElementById("candleCount");

const lightAllButton =
    document.getElementById("lightAllBtn");

const birthdayMessage =
    document.getElementById("birthdayMessage");

const backToCakeButton =
    document.getElementById("backToCakeBtn");

const particlesCanvas =
    document.getElementById("particlesCanvas");

const effectsCanvas =
    document.getElementById("effectsCanvas");


/* =========================================================
   CONFIGURAZIONE
========================================================= */

const TOTAL_CANDLES = 18;

let candles = [];

let extinguishedCandles = 0;

let celebrationStarted = false;

let balloons = [];

let balloonAnimationFrame = null;

let confettiAnimationFrame = null;


/* =========================================================
   COLORI CANDELINE
========================================================= */

const candleColors = [

    "#8fd3f4",
    "#f5a9cf",
    "#b9e8ff",
    "#f8c1dc",
    "#9edcf5",
    "#f2a6c9"

];


/* =========================================================
   COLORI PALLONCINI
========================================================= */

const balloonColors = [

    "#9bdcf5",
    "#f4a9ca",
    "#ffffff",
    "#c9b8f5",
    "#aee7f7",
    "#f7c1dc"

];


/* =========================================================
   CREA ELEMENTO SVG
========================================================= */

function createSVGElement(tag, attributes = {}) {

    const element =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );

    Object.entries(attributes).forEach(
        ([key, value]) => {

            element.setAttribute(
                key,
                value
            );

        }
    );

    return element;
}


/* =========================================================
   POSIZIONAMENTO 18 CANDELINE
========================================================= */

function calculateCandlePosition(index) {

    /*
        Le posizioni sono distribuite
        seguendo la prospettiva della superficie.
    */

    const positions = [

        [-0.72, -0.20],
        [-0.55, -0.43],
        [-0.36, -0.57],
        [-0.17, -0.65],
        [ 0.00, -0.69],
        [ 0.17, -0.65],
        [ 0.36, -0.57],
        [ 0.55, -0.43],
        [ 0.72, -0.20],

        [-0.62,  0.02],
        [-0.43,  0.12],
        [-0.22,  0.18],
        [ 0.00,  0.20],
        [ 0.22,  0.18],
        [ 0.43,  0.12],
        [ 0.62,  0.02],

        [-0.22, -0.10],
        [ 0.22, -0.10]

    ];


    const [xRatio, yRatio] =
        positions[index];


    const x =
        500 + xRatio * 300;

    const y =
        390 + yRatio * 118;


    return {
        x,
        y
    };

}


/* =========================================================
   CREA UNA CANDELA
========================================================= */

function createCandle(index) {

    const position =
        calculateCandlePosition(index);

    const x = position.x;

    const y = position.y;


    /*
        La posizione verticale determina
        la profondità apparente.
    */

    const depth =
        (y - 265) / 250;


    const scale =
        0.85 + depth * 0.20;


    const candleHeight =
        72 * scale;

    const candleWidth =
        17 * scale;


    /* ================================================
       GRUPPO
    ================================================= */

    const group =
        createSVGElement(
            "g",
            {
                class: "candle",
                "data-candle": index
            }
        );


    /* ================================================
       OMBRA
    ================================================= */

    const shadow =
        createSVGElement(
            "ellipse",
            {

                cx: x,

                cy: y + 3,

                rx: 13 * scale,

                ry: 5 * scale,

                fill: "#5d9dbb",

                opacity: ".18"

            }
        );


    group.appendChild(shadow);


    /* ================================================
       CORPO CANDELA
    ================================================= */

    const body =
        createSVGElement(
            "rect",
            {

                x:
                    x -
                    candleWidth / 2,

                y:
                    y -
                    candleHeight,

                width:
                    candleWidth,

                height:
                    candleHeight,

                rx:
                    candleWidth / 2,

                fill:
                    candleColors[
                        index %
                        candleColors.length
                    ],

                class:
                    "candle-body"

            }
        );


    group.appendChild(body);


    /* ================================================
       STRISCE
    ================================================= */

    for (let i = 0; i < 3; i++) {

        const stripe =
            createSVGElement(
                "rect",
                {

                    x:
                        x -
                        candleWidth / 2,

                    y:
                        y -
                        candleHeight +
                        14 +
                        i * 19,

                    width:
                        candleWidth,

                    height:
                        5,

                    rx:
                        3,

                    fill:
                        "#ffffff",

                    opacity:
                        ".55",

                    pointerEvents:
                        "none"

                }
            );


        group.appendChild(stripe);

    }


    /* ================================================
       STOPPINO
    ================================================= */

    const wick =
        createSVGElement(
            "line",
            {

                x1: x,

                y1:
                    y -
                    candleHeight,

                x2: x,

                y2:
                    y -
                    candleHeight -
                    12,

                class:
                    "candle-wick"

            }
        );


    group.appendChild(wick);


    /* ================================================
       FIAMMA
    ================================================= */

    const flame =
        createSVGElement(
            "path",
            {

                d: `

                    M ${x}
                      ${y - candleHeight - 8}

                    C ${x - 13 * scale}
                      ${y - candleHeight - 25 * scale},

                      ${x - 7 * scale}
                      ${y - candleHeight - 38 * scale},

                      ${x}
                      ${y - candleHeight - 46 * scale}

                    C ${x + 9 * scale}
                      ${y - candleHeight - 34 * scale},

                      ${x + 15 * scale}
                      ${y - candleHeight - 24 * scale},

                      ${x}
                      ${y - candleHeight - 8}

                    Z

                `,

                fill:
                    "#ffad32",

                class:
                    "flame"

            }
        );


    group.appendChild(flame);


    /* ================================================
       FIAMMA INTERNA
    ================================================= */

    const innerFlame =
        createSVGElement(
            "path",
            {

                d: `

                    M ${x}
                      ${y - candleHeight - 11}

                    C ${x - 6 * scale}
                      ${y - candleHeight - 23 * scale},

                      ${x - 3 * scale}
                      ${y - candleHeight - 29 * scale},

                      ${x}
                      ${y - candleHeight - 34 * scale}

                    C ${x + 5 * scale}
                      ${y - candleHeight - 25 * scale},

                      ${x + 7 * scale}
                      ${y - candleHeight - 18 * scale},

                      ${x}
                      ${y - candleHeight - 11}

                    Z

                `,

                fill:
                    "#fff9c4",

                class:
                    "flame-inner"

            }
        );


    group.appendChild(innerFlame);


    /* ================================================
       FUMO
    ================================================= */

    const smoke =
        createSVGElement(
            "path",
            {

                d: `

                    M ${x}
                      ${y - candleHeight - 45}

                    C ${x - 10}
                      ${y - candleHeight - 65},

                      ${x + 12}
                      ${y - candleHeight - 75},

                      ${x}
                      ${y - candleHeight - 95}

                `,

                class:
                    "smoke"

            }
        );


    group.appendChild(smoke);


    /* ================================================
       CLICK
    ================================================= */

    group.addEventListener(
        "click",
        () => {

            toggleCandle(index);

        }
    );


    /* ================================================
       AGGIUNGI SVG
    ================================================= */

    candlesLayer.appendChild(group);


    /* ================================================
       SALVA DATI
    ================================================= */

    candles.push({

        index,

        group,

        lit: true,

        smoke

    });

}


/* =========================================================
   CREA TUTTE LE CANDELINE
========================================================= */

function createAllCandles() {

    candles = [];

    candlesLayer.innerHTML = "";

    candleGlowLayer.innerHTML = "";

    extinguishedCandles = 0;

    celebrationStarted = false;


    for (
        let i = 0;
        i < TOTAL_CANDLES;
        i++
    ) {

        createCandle(i);

    }


    updateCounter();

}


/* =========================================================
   SPEGNI / RIACCENDI
========================================================= */

function toggleCandle(index) {

    const candle =
        candles[index];


    if (!candle) return;


    /* ================================================
       SPEGNI
    ================================================= */

    if (candle.lit) {

        candle.lit = false;

        candle.group.classList.add(
            "off"
        );

        extinguishedCandles++;


        createSmoke(candle);

        createSmallSparkles(candle);

        playBlowSound();

    }


    /* ================================================
       RIACCENDI
    ================================================= */

    else {

        candle.lit = true;

        candle.group.classList.remove(
            "off"
        );

        extinguishedCandles--;

    }


    updateCounter();


    /* ================================================
       TUTTE SPENTE
    ================================================= */

    if (
        extinguishedCandles ===
        TOTAL_CANDLES &&
        !celebrationStarted
    ) {

        celebrationStarted = true;


        setTimeout(
            () => {

                startCelebration();

            },
            600
        );

    }


    /* ================================================
       SE RIACCENDI
    ================================================= */

    if (
        extinguishedCandles <
        TOTAL_CANDLES
    ) {

        celebrationStarted = false;

        birthdayMessage.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   CONTATORE
========================================================= */

function updateCounter() {

    const remaining =
        TOTAL_CANDLES -
        extinguishedCandles;


    candleCountElement.textContent =
        remaining;

}


/* =========================================================
   FUMO
========================================================= */

function createSmoke(candle) {

    const smoke =
        candle.smoke;


    smoke.classList.remove(
        "show"
    );


    void smoke.offsetWidth;


    smoke.classList.add(
        "show"
    );


    setTimeout(
        () => {

            smoke.classList.remove(
                "show"
            );

        },
        2000
    );

}


/* =========================================================
   PICCOLE SCINTILLE
========================================================= */

function createSmallSparkles(candle) {

    const box =
        candle.group.getBoundingClientRect();

    const svgBox =
        svg.getBoundingClientRect();


    const x =
        box.left -
        svgBox.left +
        box.width / 2;


    const y =
        box.top -
        svgBox.top;


    for (let i = 0; i < 6; i++) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.style.position =
            "absolute";

        sparkle.style.left =
            `${x}px`;

        sparkle.style.top =
            `${y}px`;

        sparkle.style.width =
            "5px";

        sparkle.style.height =
            "5px";

        sparkle.style.borderRadius =
            "50%";

        sparkle.style.background =
            "#ffffff";

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.boxShadow =
            "0 0 10px #ffffff";


        sparkle.style.animation =
            "sparkleAnimation .7s ease-out forwards";


        effectsCanvas.parentElement.appendChild(
            sparkle
        );


        setTimeout(
            () => {

                sparkle.remove();

            },
            800
        );

    }

}


/* =========================================================
   ACCENDI TUTTE
========================================================= */

function lightAllCandles() {

    candles.forEach(
        candle => {

            candle.lit = true;

            candle.group.classList.remove(
                "off"
            );

            candle.smoke.classList.remove(
                "show"
            );

        }
    );


    extinguishedCandles = 0;

    celebrationStarted = false;


    birthdayMessage.classList.add(
        "hidden"
    );


    removeBalloons();

    clearEffectsCanvas();

    updateCounter();

}


/* =========================================================
   PULSANTE ACCENDI
========================================================= */

if (lightAllButton) {

    lightAllButton.addEventListener(
        "click",
        lightAllCandles
    );

}


/* =========================================================
   CELEBRAZIONE
========================================================= */

function startCelebration() {

    birthdayMessage.classList.remove(
        "hidden"
    );


    createConfetti();

    createCelebrationParticles();

    createBalloons();

}


/* =========================================================
   PULSANTE TORNA ALLA TORTA
========================================================= */

if (backToCakeButton) {

    backToCakeButton.addEventListener(
        "click",
        goBackToCake
    );

}


function goBackToCake() {

    birthdayMessage.classList.add(
        "hidden"
    );


    removeBalloons();

    clearEffectsCanvas();

}


/* =========================================================
   PALLONCINI
========================================================= */

function createBalloons() {

    removeBalloons();


    const balloonContainer =
        document.createElement(
            "div"
        );


    balloonContainer.id =
        "balloonsContainer";


    balloonContainer.style.position =
        "fixed";

    balloonContainer.style.inset =
        "0";

    balloonContainer.style.pointerEvents =
        "none";

    balloonContainer.style.overflow =
        "hidden";

    balloonContainer.style.zIndex =
        "1500";


    document.body.appendChild(
        balloonContainer
    );


    balloons = [];


    /*
        Numero di palloncini.
    */

    const balloonCount = 32;


    for (
        let i = 0;
        i < balloonCount;
        i++
    ) {

        createBalloon(
            balloonContainer,
            i
        );

    }


    animateBalloons();

}


/* =========================================================
   CREA SINGOLO PALLONCINO
========================================================= */

function createBalloon(container, index) {

    const balloon =
        document.createElement(
            "div"
        );


    const size =
        45 +
        Math.random() * 35;


    const startX =
        Math.random() * 100;


    const delay =
        Math.random() * 5;


    const duration =
        7 +
        Math.random() * 7;


    const color =
        balloonColors[
            Math.floor(
                Math.random() *
                balloonColors.length
            )
        ];


    balloon.style.position =
        "absolute";


    balloon.style.left =
        `${startX}%`;


    balloon.style.bottom =
        `-${size + 30}px`;


    balloon.style.width =
        `${size}px`;


    balloon.style.height =
        `${size * 1.22}px`;


    balloon.style.borderRadius =
        "50% 50% 45% 45%";


    balloon.style.background =
        `
        radial-gradient(
            circle at 30% 25%,
            rgba(255,255,255,.95),
            rgba(255,255,255,.2) 12%,
            transparent 25%
        ),
        ${color}
        `;


    balloon.style.boxShadow =
        `
        inset -10px -15px 20px
        rgba(80,120,150,.12),

        0 8px 18px
        rgba(80,130,160,.15)
        `;


    balloon.style.opacity =
        ".95";


    balloon.style.transform =
        "translateX(0)";


    balloon.style.animation =
        `
        balloonRise
        ${duration}s
        ease-in-out
        ${delay}s
        forwards
        `;


    /*
        Piccola corda.
    */

    const string =
        document.createElement(
            "div"
        );


    string.style.position =
        "absolute";


    string.style.left =
        "50%";


    string.style.top =
        "100%";


    string.style.width =
        "1px";


    string.style.height =
        `${size * .9}px`;


    string.style.background =
        "rgba(90,120,135,.5)";


    string.style.transform =
        "translateX(-50%)";


    balloon.appendChild(
        string
    );


    container.appendChild(
        balloon
    );


    balloons.push({

        element:
            balloon,

        x:
            startX,

        phase:
            Math.random() *
            Math.PI * 2,

        speed:
            .5 +
            Math.random() * .7

    });

}


/* =========================================================
   ANIMAZIONE PALLONCINI
========================================================= */

function animateBalloons() {

    if (
        !document.getElementById(
            "balloonsContainer"
        )
    ) {

        return;

    }


    balloons.forEach(
        balloon => {

            balloon.phase +=
                .01 *
                balloon.speed;


            const movement =
                Math.sin(
                    balloon.phase
                ) * 18;


            balloon.element.style.marginLeft =
                `${movement}px`;

        }
    );


    balloonAnimationFrame =
        requestAnimationFrame(
            animateBalloons
        );

}


/* =========================================================
   RIMUOVI PALLONCINI
========================================================= */

function removeBalloons() {

    if (balloonAnimationFrame) {

        cancelAnimationFrame(
            balloonAnimationFrame
        );

        balloonAnimationFrame = null;

    }


    const container =
        document.getElementById(
            "balloonsContainer"
        );


    if (container) {

        container.remove();

    }


    balloons = [];

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const canvas =
        effectsCanvas;

    const ctx =
        canvas.getContext("2d");


    resizeEffectsCanvas();


    const pieces = [];


    const colors = [

        "#9bdcf5",
        "#f3a8ca",
        "#ffffff",
        "#bcecff",
        "#ffd5e7",
        "#cbb8f5"

    ];


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        pieces.push({

            x:
                Math.random() *
                canvas.width,

            y:
                -Math.random() *
                canvas.height,

            size:
                Math.random() *
                8 + 4,

            speed:
                Math.random() *
                3 + 2,

            rotation:
                Math.random() *
                Math.PI,

            rotationSpeed:
                Math.random() *
                .15 - .075,

            color:
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ],

            drift:
                Math.random() *
                2 - 1

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let active = false;


        pieces.forEach(
            piece => {

                piece.y +=
                    piece.speed;


                piece.x +=
                    piece.drift;


                piece.rotation +=
                    piece.rotationSpeed;


                if (
                    piece.y <
                    canvas.height + 30
                ) {

                    active = true;

                }


                ctx.save();


                ctx.translate(
                    piece.x,
                    piece.y
                );


                ctx.rotate(
                    piece.rotation
                );


                ctx.fillStyle =
                    piece.color;


                ctx.fillRect(

                    -piece.size / 2,

                    -piece.size / 2,

                    piece.size,

                    piece.size * .55

                );


                ctx.restore();

            }
        );


        if (active) {

            confettiAnimationFrame =
                requestAnimationFrame(
                    animate
                );

        }

    }


    animate();


    setTimeout(
        () => {

            if (
                confettiAnimationFrame
            ) {

                cancelAnimationFrame(
                    confettiAnimationFrame
                );

            }

        },
        10000
    );

}


/* =========================================================
   PARTICELLE CELEBRAZIONE
========================================================= */

function createCelebrationParticles() {

    const canvas =
        particlesCanvas;

    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const particles = [];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        particles.push({

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2,

            vx:
                (Math.random() - .5) * 9,

            vy:
                (Math.random() - .5) * 9,

            size:
                Math.random() * 4 + 2,

            life:
                1

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let alive = false;


        particles.forEach(
            particle => {

                if (
                    particle.life <= 0
                ) {

                    return;

                }


                alive = true;


                particle.x +=
                    particle.vx;


                particle.y +=
                    particle.vy;


                particle.vy +=
                    .08;


                particle.life -=
                    .012;


                ctx.globalAlpha =
                    particle.life;


                ctx.beginPath();


                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.size,

                    0,

                    Math.PI * 2

                );


                ctx.fillStyle =
                    "#ffffff";


                ctx.fill();

            }
        );


        ctx.globalAlpha = 1;


        if (alive) {

            requestAnimationFrame(
                animate
            );

        }

    }


    animate();

}


/* =========================================================
   SUONO CANDELA
========================================================= */

let audioContext = null;


function playBlowSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();


        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(

            180,

            audioContext.currentTime

        );


        oscillator.frequency.exponentialRampToValueAtTime(

            60,

            audioContext.currentTime + .18

        );


        gain.gain.setValueAtTime(

            .035,

            audioContext.currentTime

        );


        gain.gain.exponentialRampToValueAtTime(

            .001,

            audioContext.currentTime + .18

        );


        oscillator.connect(
            gain
        );


        gain.connect(
            audioContext.destination
        );


        oscillator.start();


        oscillator.stop(

            audioContext.currentTime + .18

        );

    }

    catch (error) {

        console.log(
            "Audio non disponibile."
        );

    }

}


/* =========================================================
   PARTICELLE SFONDO
========================================================= */

function initBackgroundParticles() {

    const canvas =
        particlesCanvas;

    const ctx =
        canvas.getContext("2d");


    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resize();


    const particles = [];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                2.5 + 1,

            speed:
                Math.random() *
                .4 + .1,

            opacity:
                Math.random() *
                .5 + .2

        });

    }


    function animate() {

        ctx.clearRect(

            0,
            0,
            canvas.width,
            canvas.height

        );


        particles.forEach(
            particle => {

                particle.y -=
                    particle.speed;


                if (
                    particle.y <
                    -10
                ) {

                    particle.y =
                        canvas.height + 10;

                }


                ctx.beginPath();


                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.size,

                    0,

                    Math.PI * 2

                );


                ctx.fillStyle =
                    `
                    rgba(
                        255,
                        255,
                        255,
                        ${particle.opacity}
                    )
                    `;


                ctx.fill();

            }
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();


    window.addEventListener(
        "resize",
        resize
    );

}


/* =========================================================
   CANVAS EFFETTI
========================================================= */

function resizeEffectsCanvas() {

    effectsCanvas.width =
        effectsCanvas.clientWidth;

    effectsCanvas.height =
        effectsCanvas.clientHeight;

}


function clearEffectsCanvas() {

    const ctx =
        effectsCanvas.getContext("2d");


    ctx.clearRect(

        0,
        0,
        effectsCanvas.width,
        effectsCanvas.height

    );

}


/* =========================================================
   RESIZE GENERALE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        resizeEffectsCanvas();

    }
);


/* =========================================================
   AVVIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createAllCandles();

        initBackgroundParticles();

        resizeEffectsCanvas();

    }
);