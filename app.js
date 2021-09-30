// CLASSES

class Burger{

    static maxIngredient = {patty:1, veggie:5, sauce:2};

    constructor(){
        this.ingredients = [];
        this.price = 0;
        this.patty = 0;
        this.veggie = 0;
        this.sauce = 0;
        this.addIngredient(new Item('white', 'bun', 5.0));
        this.bun = 1;
    }

    addIngredient(item){

        if(this[item.type] < this.maxIngredient[item.type]){

            this.ingredients.push(item);
            this.price += item.price;
            this.adjustIngredients(item.type, true);
        }
        
        
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
        this.name = name;
        this.type = type;
        this.price = price;
    }
}


//Variables

const patties=[];

let chicken = new Item("Chicken Patty", 'patty', 7);
let beef = new Item("Beef Patty", 'patty', 10);
let meatball = new Item("Meatballs instead of patty", 'patty', 12);
let pork = new Item("Pork Patty", 'patty', 10);
let veg = new Item("Vegan Patty", 'patty', 15); //u shouldnt be a vegan thats why its more expensive >:(

patties.push(chicken);
patties.push(beef);
patties.push(meatball);
patties.push(pork);
patties.push(veg);

const items = [];

let tomato = new Item("Tomato", 'veggie', 1);
let lettuce = new Item("Lettuce", 'veggie', 1);
let pickles = new Item("Pickles", 'veggie', 1);
let cheese = new Item("Cheese", 'veggie', 2);
let onions = new Item("Onion", 'veggie', 1);
let ham = new Item("Ham", 'veggie', 3);
let bacon = new Item("Bacon", 'veggie', 3);
let vCheese = new Item("Vegan Cheese", 'veggie', 5);
let egg = new Item("Egg", 'veggie', 2.5);
let jalapeno = new Item("Jalapeno pepper", 'veggie', 2);

items.push(tomato);
items.push(lettuce);
items.push(pickles);
items.push(cheese);
items.push(onions);
items.push(ham);
items.push(bacon);
items.push(vCheese);
items.push(egg);
items.push(jalapeno);

const sauces = [];

let mayo = new Item("Mayonnaise", 'sauce', 0.5);
let ketchup = new Item("Ketchup", 'sauce', 0.5);
let bbq = new Item("Barbeque", 'sauce', 1);
let hot = new Item("Hot Sauce", 'sauce', 1);
let mustard = new Item("Mustard", 'sauce', 1);

sauces.push(mayo);
sauces.push(ketchup);
sauces.push(bbq);
sauces.push(hot);
sauces.push(mustard);

const ingSect = [{name: 'patty', value: patties}, {name: 'veggie' , value: items}, {name: 'sauce', value: sauces}];


// EVENT LISTENERS

//to change pages
const past = document.querySelector(".past");
const index = document.querySelector(".index");


past.addEventListener("click", function(){
    changePage('./past_burgers.html')

});
index.addEventListener("click", function(){
    changePage('./index.html')

});

///test
const add = document.querySelector('.add-btn');
const ing = document.querySelector('.add-bur');

add.addEventListener('click', function(){
    
    add.parentElement.classList.add('hidden');
    ing.classList.remove('hidden');
}); 




// FUNCTIONS

function changePage(newpage){

    //function to switch between the pages
    document.location.href = newpage;

}

function checkBurger(burger){

    //function to check if burger is not too much of an abomination

    if(burger.patty === Burger.maxIngredient[patty] && burger.veggie <= Burger.maxIngredient[veggie] && burger.sauce <= Burger.maxIngredient[sauce]){
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

    const chooseBurgerPart = document.querySelector('.cho-ing');


    for (let item of ingSect){

        //function to add every ingredient section (saved in ingSect)
        addIngredientSection(item, chooseBurgerPart); 

    }

    //const showBurgerPart = document.querySelector('.fin-bur');



    
}



function addIngredientSection(obj, section){
    
    const htmlSection = document.createElement('div'); //create a div for every type of ingredient

    htmlSection.classList.add(obj.name);  //adding a class to the type, in case of modifying the style 


    htmlSection.classList.add('ingredients');
    htmlSection.innerText = capitalize(obj.name);

    htmlSection.innerHTML += "<br>";
    
    for (let ingredient of obj.value){ //create the button to add each ingredient

        const ingredientButton = document.createElement('button');

        ingredientButton.setAttribute("onclick", `addTOBURGER('${ingredient.name.toLowerCase.split(" ")[0]}')`);

        debugger;

        ingredientButton.classList.add('pg-btn');
        ingredientButton.classList.add('margin');
        ingredientButton.innerText = ingredient.name + " (" + ingredient.price + "tl)";

        htmlSection.appendChild(ingredientButton);
    }

    section.appendChild(htmlSection);

}

function addTOBURGER(item){

    bun = document.querySelector('.top-bun');

    ingredient = document.createElement('div');
    ingredient.classList.add(item);

    debugger;

    bun.parentNode.insertBefore(ingredient, bun.nextSibling);
}


function capitalize(str){

    return str.charAt(0).toUpperCase() + str.slice(1);

}

function initializePastBurgers() {

    //function to set up the past burgers page

    console.log('past burgers initialized');

}
