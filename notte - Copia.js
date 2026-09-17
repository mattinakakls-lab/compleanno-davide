// ===============================
// MODALITÀ NOTTE 🌙
// ===============================


// MESSAGGIO STELLE

const button = document.getElementById("starsButton");
const message = document.getElementById("message");


if(button){

button.addEventListener("click",()=>{

    message.classList.add("show");

    button.innerHTML="❤️ Desiderio espresso";

});

}







// ===============================
// LUNA CLICCABILE 🌙
// ===============================


const moon = document.querySelector(".moon");


if(moon){

moon.addEventListener("click",()=>{


    moon.style.transform="scale(1.15)";


    moon.style.boxShadow=
    "0 0 50px #fff5c7";


    setTimeout(()=>{

        alert(
        "🌙 Guarderei il cielo con te per sempre ❤️"
        );


    },300);


});

}








// ===============================
// STELLE CLICCABILI ⭐
// ===============================


const stars=document.querySelectorAll(".stars span");


let frasi=[

"⭐ Sei la mia stella preferita ❤️",

"✨ Ogni momento con te è speciale",

"🌙 Vorrei fermare questi momenti",

"💖 Sei il mio desiderio più bello"

];



stars.forEach(star=>{


star.addEventListener("click",()=>{


alert(

frasi[
Math.floor(Math.random()*frasi.length)
]

);


});


});








// ===============================
// CREA STELLA CON DESIDERIO ✨
// ===============================


function makeWish(){


let input=document.getElementById("wish");


if(!input){

return;

}



if(input.value.trim()==""){


alert("Scrivi un desiderio ✨");

return;


}



let newStar=document.createElement("span");


newStar.innerHTML="⭐";


newStar.style.position="absolute";


newStar.style.left=
Math.random()*90+"%";


newStar.style.top=
Math.random()*60+"%";


newStar.style.fontSize="35px";


newStar.style.zIndex="10";


newStar.style.filter=
"drop-shadow(0 0 10px white)";



document
.querySelector(".night-sky")
.appendChild(newStar);



input.value="";


alert(
"✨ Il tuo desiderio è diventato una stella ❤️"
);


}







// ===============================
// STELLE CADENTI EXTRA ☄️
// ===============================


function creaStellaCadente(){


let star=document.createElement("div");


star.className="shoot";


star.style.top=
Math.random()*40+"%";


star.style.left=
Math.random()*100+"%";



document
.querySelector(".night-sky")
.appendChild(star);



setTimeout(()=>{

star.remove();

},5000);


}



setInterval(creaStellaCadente,7000);








// ===============================
// PIANETI 🪐
// ===============================


function openPlanet(tipo){


let testo="";


switch(tipo){


case "foto":

testo="🌍 Qui ci sono i nostri momenti più belli 📸";

break;



case "lettera":

testo="🪐 Una dedica speciale solo per te 💌";

break;



case "dedica":

testo="🌕 Anche guardando la luna penso a te ❤️";

break;



case "video":

testo="☄️ Un video pieno di ricordi 🎥";

break;


}



alert(testo);


}








// ===============================
// TELESCOPIO 🔭
// ===============================


