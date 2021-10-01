const past = document.querySelector(".past");
const index = document.querySelector(".index");

past.addEventListener("click", function(){
    changePage('./past_burgers.html');

});
index.addEventListener("click", function(){
    changePage('./index.html');

});

function changePage(newpage){

    //function to switch between the pages
    document.location.href = newpage;

}


function initializePastBurgers() {

    //function to set up the past burgers page

    console.log('past burgers initialized');


    let burgers;

    if (localStorage.getItem('burgers')===null){
        thereAreNoBurgers();
    }
    else{
        listBurgers();
    }

}

function thereAreNoBurgers(){

    let win = document.querySelector('.rest');

    let noBurgers = document.createElement('div');

    noBurgers.classList.add('no-burger');

    noBurgers.innerText = "You have not bought a burger before :(";

    win.appendChild(noBurgers);

}

function listBurgers(){

    const burgers = JSON.parse(localStorage.getItem("burgers"));
    
    for (let burger of burgers){

        let container = document.querySelector('.rest')

        let burgerRow = document.createElement('div');
        burgerRow.classList.add('flex');

        let funcArray = [draw, listIngredients, favorite];

        for (let func of funcArray){
            burgerRow.appendChild(func(burger));
        }

        container.appendChild(burgerRow);

    }
}

function draw(burger){

    let burgerContainer = document.createElement('div');

    burgerContainer.classList.add('burger-container');

    let topBun = document.createElement('div');
    topBun.classList.add('bun');
    topBun.classList.add('top-bun');

    let bottomBun = document.createElement('div');
    bottomBun.classList.add('bun');
    bottomBun.classList.add('bottom-bun');

    burgerContainer.appendChild(topBun);
    burgerContainer.appendChild(bottomBun);

    for(let item of burger.ingredients){

        ingredient = document.createElement('div');

        ingredient.classList.add(item.name.toLowerCase().split(" ")[0]);
        topBun.parentNode.insertBefore(ingredient, topBun.nextSibling);

    }

    return burgerContainer;    

}

function listIngredients(burger){

    let ingredientsContainer = document.createElement('div');

    ingredientsContainer.classList.add('list-ing');

    for(let item of burger.ingredients){

        let ing = document.createElement('div');
        ing.innerText = item.name;
        
        ingredientsContainer.appendChild(ing);
    }
    
    return ingredientsContainer;
}

function favorite(burger){

    let fav =  document.createElement('div');

    fav.classList.add('normal');

    fav.innerText = 'Add to favorites';

    fav.onclick = function(){

        burger.favorite = (burger.favorite ? false : true);
        textToggle(fav);
        fav.classList.toggle('favorite');
    }

    return fav;
}

function textToggle(fav) {

    if (fav.innerText === 'Add to favorites') {
      fav.innerText = "Remove from favorites";
    } else {
      fav.innerText = "Add to favorites";
    }
  }