const expand = document.getElementById("expand");
const comprime = document.getElementById("comprime");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close");
const submit = document.getElementById("submit");

var mainards = JSON.parse(localStorage.getItem("mainards"));

refreshMain(mainards);

expand.addEventListener("click", () =>{

    const cards = document.querySelectorAll(".card");

    cards.forEach(element => {

        element.classList.add("width");
        expand.classList.add("clicked");
        comprime.classList.remove("clicked");
        element.clicked = true;

    });

    mainards.forEach(main =>{

        main.clicked = true;

    })
});

comprime.addEventListener("click", () =>{

    const cards = document.querySelectorAll(".card");

    cards.forEach(element => {

        element.classList.remove("width");
        comprime.classList.add("clicked");
        expand.classList.remove("clicked");

    });

    mainards.forEach(main =>{

        main.clicked = false;

    })
});

add.addEventListener("click", () =>{

    modal.style.display = "block";
   
});

remove.addEventListener("click", () =>{

    mainards = mainards.filter(element =>{

        return element.clicked === false;

    })

    refreshMain(mainards);

});

// When the user clicks on <span> (x), close the modal
close[0].addEventListener("click", () => {

    modal.style.display = "none";

});
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

submit.addEventListener("click",()=>{

    const letter = document.getElementById("letter");
    const name = document.getElementById("name");
    const topLeft = document.getElementById("top_left");
    const topRight = document.getElementById("top_right");
    const bottomLeft = document.getElementById("bottom_left");
    const bottomRight = document.getElementById("bottom_right");

    console.log(letter.value);

    mainards.push({"type": letter.value,
    "name": name.value,
    "topLeft": topLeft.checked?true:false, 
    "topRight": topRight.checked?true:false, 
    "bottomLeft": bottomLeft.checked?true:false, 
    "bottomRight": bottomRight.checked?true:false, 
    "clicked":false});
    
    refreshMain(mainards);

    letter.value = name.value = "";
    topLeft.checked = topRight.checked = bottomLeft.checked = bottomRight.checked = false ;

    modal.style.display = "none";
});


function refreshMain(oCards){

    const mainCards = document.getElementById("main-cards");
    
    if(oCards !== null){

        mainCards.innerHTML = ``;

        oCards.forEach(element => {

            mainCards.innerHTML += ` <div class="card active">
            <div class="state">
                <p>${element.type}</p>
                ${element.topLeft?`<div class="dot top-left"></div>`:``}
                ${element.topRight?`<div class="dot top-right"></div>`:``}
                ${element.bottomLeft?`<div class="dot bottom-left"></div>`:``}
                ${element.bottomRight?`<div class="dot bottom-right"></div>`:``}
            </div>

            <p class="name">${element.name}</p>
        </div>`;
            
        });

        const cards = document.querySelectorAll(".card");

        cards.forEach((element,index) => {
        
            element.addEventListener("click", function() {
        
                if(!element.classList.contains("width")) {
                
                    element.classList.add("width");

                    oCards[index].clicked = true;

                } else {
        
                    element.classList.remove("width");

                    oCards[index].clicked = false;

                }
            })
        });

        localStorage.setItem("mainards", JSON.stringify(mainards));
        
    } 

}