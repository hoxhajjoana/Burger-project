// CLASSES

class Burger{

    constructor(){
        this.ingredients = [];
        this.price = 0;
        this.meat = 0;
        this.veggie = 0;
        this.sauce = 0;
        this.addIngredient(new Item('white', 'bun', 5.0))
    }

    addIngredient(item){
        this.ingredients.push(item);
        this.price += item.price;
        this.adjustIngredients(item.type, true);
    }

    removeIngredient(item){
        
        for(let i = 0; i < this.ingredients.length; i++) {
            
            if(this.ingredients[i].name === item.name) {
                this.ingredients.splice(i, 1);
                break;
            }
        }

        this.price -=item.price;
        this.adjustIngredient(item.type, false)
    }

    adjustIngredient(type, action){

        if(action){
            
            this[type]+=1;
        }
        else{
            this[type]-=1;
        }
    }

}

class Item{

    constructor(name, type, price){
        this.ingredient = name;
        this.type = type;
        this.price = price;
    }
}




// EVENT LISTENERS

//to change pages
const fav = document.querySelector(".fav");
const past = document.querySelector(".past");
const index = document.querySelector(".index");

fav.addEventListener("click", function(){
    changePage('./favorites.html')

});
past.addEventListener("click", function(){
    changePage('./past_burgers.html')

});
index.addEventListener("click", function(){
    changePage('./index.html')

});

///test
const dicka = document.querySelector('.add-btn');

dicka.addEventListener('click', function(){
    
    dicka.parentElement.classList.add('hidden')
});




// FUNCTIONS

function changePage(newpage){

    //function to switch between the pages
    document.location.href = newpage;

}

function checkBurger(burger){

    //function to check if burger is not too much of an abomination

    if(burger.meat === 1 && burger.veggie <= 4 && burger.sauce <=2){
        return true;
    }
    return false;

}

function addBurger(burger, fav){

    //function to add the burger in the past burgers list/page

    if(checkBurger(burger)){

        //u no dumdum

    }
    else{
        //u dumdum
    }

}

function initializeIndex() {
    //function to set up the main page

    console.log("index initialized");

    
}

function initializePastBurgers() {

    //function to set up the past burgers page

    console.log('past burgers initialized');

}

function initializeFavorites(){
    
    //function to set up the favorite burgers page

    console.log("initialized favorites");

}