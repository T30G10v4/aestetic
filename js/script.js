const expand = document.getElementById("expand");
const comprime = document.getElementById("comprime");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close");

console.log(close);

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

    mainards.push({"type": "Z",
        "name": "Funziona!",
        "topLeft": true, "clicked":false});

    refreshMain(mainards);
   
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