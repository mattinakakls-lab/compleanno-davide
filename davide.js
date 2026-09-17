const btn = document.getElementById("btn");

const surprise = document.getElementById("surprise");


btn.onclick = () => {


btn.style.display="none";


surprise.style.display="block";



let durata = 8000;

let fine = Date.now()+durata;



(function fuochi(){


confetti({

particleCount:15,

spread:120,

origin:{
x:Math.random(),
y:Math.random()
},

colors:[
"#ff0080",
"#ffffff",
"#ff66cc"
]

});



confetti({

particleCount:5,

spread:100,

scalar:2,

shapes:["heart"],

origin:{
x:Math.random(),
y:Math.random()-0.2
}

});



if(Date.now()<fine){

requestAnimationFrame(fuochi);

}


})();



};





for(let i=0;i<100;i++){


let stella=document.createElement("span");


stella.style.left=Math.random()*100+"%";


stella.style.animationDelay=Math.random()*5+"s";


document.querySelector(".stars").appendChild(stella);


}