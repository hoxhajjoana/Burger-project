// duplicate code because I could not make import/export work without https


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
//end of duplicate code from app.js



//FUNCTIONS


function initializePastBurgers() {

    //function to set up the past burgers page

    console.log('past burgers initialized');

    if (localStorage.getItem('burgers')===null || JSON.parse(localStorage.getItem('burgers')).length === 0){
        thereAreNoBurgers();
    }
    else{
        listBurgers();
    }

}

function thereAreNoBurgers(){

    //function to set up the page if there are no burgers saved in local storage

    let win = document.querySelector('.rest');

    let noBurgers = document.createElement('div');

    noBurgers.classList.add('rest');
    noBurgers.classList.add('no-burger');
    win.classList.add('flex');

    noBurgers.innerHTML = "<h2> You have not bought a burger before :(</h2>";

    win.appendChild(noBurgers);

}

function listBurgers(){

    //function to list the burgers that are saved in local storage

    const burgers = JSON.parse(localStorage.getItem("burgers"));
    
    for (let burger of burgers){

        let container = document.querySelector('.rest')

        let burgerRow = document.createElement('div');
        burgerRow.classList.add('flex');

        let funcArray = [draw, listIngredients, favorite, deleteBurger];/// if any other functions are added, just add to this array to call it later

        for (let func of funcArray){
            burgerRow.appendChild(func(burger));
        }

        container.appendChild(burgerRow);

    }
}

function draw(burger){

    //function to build the burger visually

    let burgerContainer = document.createElement('div');

    burgerContainer.classList.add('burger-container');

    let topBun = document.createElement('div'); //need to fix this so that there is no need for the repeated code
    topBun.classList.add('bun');
    topBun.classList.add('top-bun');
    topBun.classList.add('ing-past');

    let bottomBun = document.createElement('div');
    bottomBun.classList.add('bun');
    bottomBun.classList.add('bottom-bun');
    bottomBun.classList.add('ing-past');


    burgerContainer.appendChild(topBun);
    burgerContainer.appendChild(bottomBun);

    for(let item of burger.ingredients){

        ingredient = document.createElement('div');

        ingredient.classList.add(item.name.toLowerCase().split(" ")[0]);
        ingredient.classList.add(item.type);
        ingredient.classList.add("ing-past");
        topBun.parentNode.insertBefore(ingredient, topBun.nextSibling);

    }

    return burgerContainer;    

}

function listIngredients(burger){

    //function to list the burger ingredients

    let ingredientsContainer = document.createElement('div');

    ingredientsContainer.classList.add('list-ing');

    burger.ingredients.reduceRight((_,item) => { ///arrow function to list ingredients in the same order as they are added

            let ing = document.createElement('div');
            ing.innerText = item.name;
            
            ingredientsContainer.appendChild(ing);
        }, null);


    let ing = document.createElement('div');

    ing.innerHTML = `<br> ${burger.price} TL`;//listing price too
    
    ingredientsContainer.appendChild(ing);
    
    return ingredientsContainer;
}

function favorite(burger){

    //function to make a button to add a burger to favorites

    let fav =  document.createElement('div');

    fav.classList.add('normal');

    if(burger.favorite){
        fav.innerText = 'Remove from favorites';
        fav.classList.add('favorite');
    }
    else{
        fav.innerText = 'Add to favorites';
    }

    fav.onclick = function(){ //onclick function to remove or add it to favorites

        burger.favorite = (burger.favorite ? false : true);
        textToggle(fav);
        fav.classList.toggle('favorite');

        updateBurgerInLocalStorage(burger);//update the burger in local storage
    }

    return fav;
}

function deleteBurger(burger){

    //function to delete burger from the list of saved burgers

    let del = document.createElement('div');

    del.classList.add('delete');
    del.innerText = "Delete";

    del.onclick = function () {//onlcick function to delete and update the local storage

        del.parentElement.remove();
        deleteBurgerFromLocalStorage(burger);
        if (JSON.parse(localStorage.getItem('burgers')).length === 0){

            thereAreNoBurgers();
        }
    }
    
    return del;

}

function deleteBurgerFromLocalStorage(burger){

    //function to delete burger from local storage

    let burgers = JSON.parse(localStorage.getItem('burgers'));    

    burgers = burgers.filter(item => JSON.stringify(item) !== JSON.stringify(burger));
        
    localStorage.setItem('burgers', JSON.stringify(burgers));

}

function textToggle(fav) {

    //function to toggle the text in the favorite button

    if (fav.innerText === 'Add to favorites') {
      fav.innerText = "Remove from favorites";
    } else {
      fav.innerText = "Add to favorites";
    }

}

function updateBurgerInLocalStorage(burger){

    //function to update burger in the local storage

    burger.favorite = !burger.favorite;

    let burgers = JSON.parse(localStorage.getItem('burgers'));

    for (let storedBurger of burgers){
        if(JSON.stringify(burger)===JSON.stringify(storedBurger)){

            storedBurger.favorite = !burger.favorite;
            break;
        }
    }

    localStorage.setItem('burgers', JSON.stringify(burgers));

}

