
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
    debugger;

    if (localStorage.getItem('burgers')===null || JSON.parse(localStorage.getItem('burgers')).length === 0){
        thereAreNoBurgers();
    }
    else{
        listBurgers();
    }

}

function thereAreNoBurgers(){

    debugger;

    let win = document.querySelector('.rest');

    let noBurgers = document.createElement('div');

    noBurgers.classList.add('rest');
    noBurgers.classList.add('no-burger');
    win.classList.add('flex');

    noBurgers.innerHTML = "<h2> You have not bought a burger before :(</h2>";

    win.appendChild(noBurgers);
    debugger;

}

function listBurgers(){

    const burgers = JSON.parse(localStorage.getItem("burgers"));
    
    for (let burger of burgers){

        let container = document.querySelector('.rest')

        let burgerRow = document.createElement('div');
        burgerRow.classList.add('flex');

        let funcArray = [draw, listIngredients, favorite, deleteBurger];

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

    if(burger.favorite){
        fav.innerText = 'Remove from favorites';
        fav.classList.add('favorite');
    }
    else{
        fav.innerText = 'Add to favorites';
    }

    fav.onclick = function(){

        burger.favorite = (burger.favorite ? false : true);
        textToggle(fav);
        fav.classList.toggle('favorite');

        updateBurgerInLocalStorage(burger);

    }

    return fav;
}

function deleteBurger(burger){

    let del = document.createElement('div');

    debugger;

    del.classList.add('delete');
    del.innerText = "Delete";

    del.onclick = function () {

        del.parentElement.remove();
        deleteBurgerFromLocalStorage(burger);
        if (JSON.parse(localStorage.getItem('burgers')).length === 0){

            thereAreNoBurgers();
        }
    }
    
    return del;

}

function deleteBurgerFromLocalStorage(burger){

    let burgers = JSON.parse(localStorage.getItem('burgers'));    

    burgers = burgers.filter(item => JSON.stringify(item) !== JSON.stringify(burger));
        
    localStorage.setItem('burgers', JSON.stringify(burgers));

}

function textToggle(fav) {

    if (fav.innerText === 'Add to favorites') {
      fav.innerText = "Remove from favorites";
    } else {
      fav.innerText = "Add to favorites";
    }
}

function updateBurgerInLocalStorage(burger){

    burger.favorite = !burger.favorite;

    
    let burgers = JSON.parse(localStorage.getItem('burgers'));

    for (let storedBurger of burgers){
        if(JSON.stringify(burger)===JSON.stringify(storedBurger)){

            storedBurger.favorite = !burger.favorite;
            debugger;
            break;
        }
    }

    debugger;

    localStorage.setItem('burgers', JSON.stringify(burgers));

}

