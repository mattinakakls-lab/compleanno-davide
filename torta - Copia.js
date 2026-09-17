// ===============================
// TORTA 18 ANNI - JAVASCRIPT
// ===============================


// PRENDE ELEMENTI PAGINA

const button = document.getElementById("spegnicandeline");

const flames = document.querySelectorAll(".flame");

const message = document.querySelector(".birthday-message");

const coriandoli = document.getElementById("coriandoli");





// CONTROLLO SICUREZZA

if(button){


button.addEventListener("click", function(){



    // ===============================
    // SPEGNE CANDELINE
    // ===============================


    flames.forEach(fiamma=>{

        fiamma.style.display="none";

    });





    // ===============================
    // CAMBIA TESTO PULSANTE
    // ===============================


    button.innerHTML="✨ Desiderio espresso ❤️";


    button.style.pointerEvents="none";






    // ===============================
    // MOSTRA MESSAGGIO
    // ===============================


    setTimeout(()=>{


        if(message){

            message.style.display="block";

        }


    },1000);







    // ===============================
    // CORIANDOLI
    // ===============================


    for(let i=0; i<180; i++){



        let confetto=document.createElement("div");


        confetto.classList.add("confetti");




        // posizione casuale

        confetto.style.left = 
        Math.random()*100 + "%";




        // colori festa

        let colori=[

            "#ff5fa2",
            "#ffd700",
            "#00d9ff",
            "#7cff7c",
            "#ff4444",
            "#ffffff",
            "#b47cff"

        ];



        confetto.style.backgroundColor =
        colori[Math.floor(Math.random()*colori.length)];






        // dimensione casuale

        let dimensione =
        Math.random()*8+8;


        confetto.style.width =
        dimensione+"px";


        confetto.style.height =
        dimensione+"px";






        // velocità caduta casuale

        confetto.style.animationDuration =
        (Math.random()*2+2)+"s";






        // rotazione casuale

        confetto.style.transform =
        "rotate("+Math.random()*360+"deg)";






        coriandoli.appendChild(confetto);






        // elimina dopo animazione

        setTimeout(()=>{


            confetto.remove();


        },4000);



    }





});

}