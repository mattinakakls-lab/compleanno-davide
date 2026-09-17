/* =========================================================
   PLAYLIST DI DAVIDE ❤️
========================================================= */


/* =========================================================
   ELEMENTI HTML
========================================================= */

const audio = document.getElementById("audio-player");
const vinyl = document.getElementById("vinyl");
const albumCover = document.getElementById("album-cover");

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songMessage = document.getElementById("song-message-text");

const playButton = document.getElementById("play-btn");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volume-bar");

const playlistButtons =
    document.querySelectorAll(".playlist-song");


/* =========================================================
   CANZONI
========================================================= */

const songs = [

    {
        title: "Non abbiamo età",
        artist: "Artista",
        cover: "non.png",
        audio: "non.mp3",
        message: ""
    },

    {
        title: "La scelta migliore",
        artist: "Artista",
        cover: "la.jfif",
        audio: "la.mp3",
        message: ""
    },

    {
        title: "Sole e luna",
        artist: "Artista",
        cover: "sl.jfif",
        audio: "sl.mp3",
        message: ""
    },

    {
        title: "Tu",
        artist: "Umberto Tozzi",
        cover: "tu.jfif",
        audio: "tu.mp3",
        message: ""
    },

    {
        title: "Motociclisti",
        artist: "Artista",
        cover: "ma.jfif",
        audio: "ma.mp3",
        message: ""
    },

    {
        title: "Spunta la luna dal monte",
        artist: "Artista",
        cover: "sp.jfif",
        audio: "sp.mp3",
        message: ""
    }

];


/* =========================================================
   CANZONE ATTUALE
========================================================= */

let currentSong = 0;


/* =========================================================
   CAMBIO SFONDO
========================================================= */

function changeBackground(image) {

    document.body.style.setProperty(
        "--music-background",
        `url("${image}")`
    );

}


/* =========================================================
   CAMBIO SFONDO CON EFFETTO
========================================================= */

function updateBackground(song) {

    /* immagine nuova */

    document.body.style.setProperty(
        "--music-background",
        `url("${song.cover}")`
    );


    /* piccolo effetto di cambio */

    document.body.classList.remove("background-changing");

    void document.body.offsetWidth;

    document.body.classList.add("background-changing");

}


/* =========================================================
   CARICA CANZONE
========================================================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];


    /* =====================================================
       SFONDO
    ===================================================== */

    updateBackground(song);


    /* =====================================================
       TITOLO
    ===================================================== */

    songTitle.textContent = song.title;


    /* =====================================================
       ARTISTA
    ===================================================== */

    songArtist.textContent = song.artist;


    /* =====================================================
       COPERTINA
    ===================================================== */

    albumCover.src = song.cover;

    albumCover.alt =
        "Copertina di " + song.title;


    /* =====================================================
       MESSAGGIO
    ===================================================== */

    songMessage.textContent = song.message;


    /* =====================================================
       AUDIO
    ===================================================== */

    audio.src = song.audio;

    audio.load();


    /* =====================================================
       RESET PROGRESS BAR
    ===================================================== */

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    /* =====================================================
       CANZONE ATTIVA
    ===================================================== */

    playlistButtons.forEach(
        (button, index) => {

            button.classList.toggle(
                "active",
                index === currentSong
            );

        }
    );

}


/* =========================================================
   PLAY
========================================================= */

function playSong() {

    audio.play().catch(error => {

        console.error(
            "Errore nella riproduzione:",
            error
        );

    });

}


/* =========================================================
   PAUSA
========================================================= */

function pauseSong() {

    audio.pause();

}


/* =========================================================
   PLAY / PAUSA
========================================================= */

playButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================================================
   AGGIORNA PLAY
========================================================= */

function updatePlayButton() {

    if (audio.paused) {

        playButton.textContent = "▶";

        playButton.setAttribute(
            "aria-label",
            "Riproduci"
        );

        vinyl.classList.remove("playing");

    } else {

        playButton.textContent = "Ⅱ";

        playButton.setAttribute(
            "aria-label",
            "Pausa"
        );

        vinyl.classList.add("playing");

    }

}


/* =========================================================
   PRECEDENTE ⏮
========================================================= */

previousButton.addEventListener(
    "click",
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong = songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* =========================================================
   SUCCESSIVA ⏭
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* =========================================================
   CLICK PLAYLIST
========================================================= */

playlistButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                loadSong(index);

                playSong();

            }
        );

    }
);


/* =========================================================
   PLAY
========================================================= */

audio.addEventListener(
    "play",
    () => {

        updatePlayButton();

    }
);


/* =========================================================
   PAUSA
========================================================= */

audio.addEventListener(
    "pause",
    () => {

        updatePlayButton();

    }
);


/* =========================================================
   PROGRESS BAR
========================================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.value = progress;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* =========================================================
   DURATA
========================================================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* =========================================================
   FORMATTA TEMPO
========================================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        secondsLeft
            .toString()
            .padStart(2, "0")
    );

}


/* =========================================================
   SPOSTAMENTO MUSICA
========================================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (progressBar.value / 100) *
            audio.duration;

    }
);


/* =========================================================
   VOLUME
========================================================= */

volumeBar.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(volumeBar.value);

    }
);


/* =========================================================
   FINE CANZONE
========================================================= */

audio.addEventListener(
    "ended",
    () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* =========================================================
   INIZIALIZZAZIONE
========================================================= */

loadSong(0);


/* =========================================================
   VOLUME INIZIALE
========================================================= */

audio.volume = 1;

volumeBar.value = 1;


/* =========================================================
   BLOCCA SCROLL ORIZZONTALE
========================================================= */

document.body.style.overflowX = "hidden";