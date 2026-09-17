const reasons = [
"1. Per il tuo sorriso",
"2. Per la tua voglia di vivere",
"3. Per la tua famiglia",
"4. Per i tuoi modi di fare",
"5. Perché mi hai cambiato il modo di vedere il mondo",
"6. Perché mi fai vedere le stelle anche quando non ci sono",
"7. Per come mi fai sentire speciale",
"8. Perché il mio massimo è il tuo minimo",
"9. Per come affronti i problemi",
"10. Per la tua presenza nella mia vita",

"11. Perché sei diverso da tutti",
"12. Perché con te sto bene",
"13. Perché mi fai stare tranquilla",
"14. Perché mi fai ridere senza motivo",
"15. Perché sei importante per me",
"16. vabbè questo è ovvio",
"17. Perché sei autentico",
"18. Perché non ti arrendi",
"19. Perché hai un cuore enorme",
"20. Perché sei te stesso",

"21. Perché mi ascolti",
"22. Perché mi capisci",
"23. Perché sei raro",
"24. Perché sei gentile",
"25. Perché sei forte",
"26. Perché sei fragile nel modo giusto",
"27. Perché mi fai pensare a noi",
"28. Perché sei la mia persona preferita",
"29. Perché mi fai sentire a casa",
"30. Perché sei luce",

"31. Perché mi fai crescere",
"32. Perché sei il mio pensiero fisso",
"33. Perché sei speciale senza accorgertene",
"34. Perché con te tutto ha senso",
"35. Perché sei dolce",
"36. Perché sei sincero",
"37. Perché sei il mio rifugio",
"38. Perché sei unico",
"39. Perché sei importante",
"40. Perché mi fai bene",

"41. Perché sei il mio equilibrio",
"42. Perché sei la mia calma",
"43. Perché sei il mio sorriso",
"44. Perché sei sempre nei miei pensieri",
"45. Perchè sei tutto per me",
"46. 🌞🌙 perchè sei semplicemente tu, ti amo tanto"
];


// riempi fino a 101 motivi
for(let i = reasons.length; i < 46; i++){
    reasons.push("Perché sei speciale ❤️ #" + (i+1));
}

let index = 0;

/* ❤️ CUORI */
function createHearts(){

    for(let i = 0; i < 8; i++){

        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        heart.style.left =
            (window.innerWidth/2 + (Math.random()*200 - 100)) + "px";

        heart.style.top =
            (window.innerHeight/2 + (Math.random()*100 - 50)) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

/* 📖 CAMBIO SOLO TESTO */
function nextCard(){

    const text = document.getElementById("cardText");
    const counter = document.getElementById("counter");

    createHearts();

    // mostra PRIMA il motivo corrente
    text.innerHTML = reasons[index];
    counter.innerHTML = (index + 1) + " / " + reasons.length;

    // poi vai al prossimo
    index++;

    if(index >= reasons.length){
        index = 0;
    }
}