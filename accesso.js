// ===============================
// ACCESSO SEGRETO SITO COMPLEANNO
// ===============================


// PAROLA SEGRETA

const parolaCorretta = "marc marquez";




// FUNZIONE ENTRA

function entra(){



    let password = document.getElementById("password").value;



    let errore = document.getElementById("errore");



    let pagina = document.querySelector(".login-page");





    // CONTROLLO PASSWORD


    if(password.toLowerCase() === parolaCorretta){



        errore.style.color="#ff5fa2";

        errore.innerHTML="❤️ Accesso consentito...";



        // animazione uscita


        pagina.style.transition="1s";

        pagina.style.opacity="0";

        pagina.style.transform="scale(1.2)";




        // apre home


        setTimeout(()=>{


            window.location.href="davide.html";


        },1500);




    }



    else{



        errore.innerHTML="❌ Parola sbagliata, riprova ❤️";



        // effetto vibrazione


        document.querySelector(".login-box")
        .style.animation="shake .4s";



        setTimeout(()=>{


            document.querySelector(".login-box")
            .style.animation="";


        },500);



    }



}







// PREMERE INVIO


document
.getElementById("password")
.addEventListener("keypress",function(event){



    if(event.key==="Enter"){


        entra();


    }



});








// ANIMAZIONE ERRORE

const style = document.createElement("style");


style.innerHTML=`


@keyframes shake{


0%{

transform:translateX(0);

}


25%{

transform:translateX(-15px);

}


50%{

transform:translateX(15px);

}


75%{

transform:translateX(-10px);

}


100%{

transform:translateX(0);

}



}



`;



document.head.appendChild(style);