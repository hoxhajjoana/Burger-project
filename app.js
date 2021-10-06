// CLASSES


class Item{

    constructor(name, type, price){
        this.name = name;
        this.type = type;
        this.price = price;
    }
}

class Burger{

    static maxIngredient = {'patty':2, 'veggie':5, 'sauce':2, 'bun':1};

    constructor(){
        this.ingredients = [];
        this.price = 0;
        this.patty = 0;
        this.veggie = 0;
        this.sauce = 0;
        this.bun = 0;////wanted to implement a 
        this.favorite = false;
        this.addIngredient(new Item('White Bun', 'bun', 5.0));
        
    }

    addIngredient(item){

        console.log('Trying to add '+ item.name);

        if(this[item.type] < Burger.maxIngredient[item.type]){

            this.ingredients.push(item);
            this.price += item.price;
            this.adjustIngredients(item.type, true);
            console.log("succeeded");
            return true;
        }
        window.alert(`You cannot add more of the ${item.type} type of ingredients. If you have changed your mind about any of the ingredients, click on it on the illustration to remove it.`);
        
        //make a popup instead
        console.log("failed");
        return false;
    }

    removeIngredient(item){

        console.log('Trying to remove '+ item.name);
        
        //a = this.ingredients.find((_,i) => i.name === item.name)
        
        for(let i = 0; i < this.ingredients.length; i++) {
            
            if(this.ingredients[i].name === item.name) {
                this.ingredients.splice(i, 1);
                break;
            }
        }

        this.price -= item.price;
        this.adjustIngredients(item.type, false);
    }

    adjustIngredients(type, action){

        if(action){
            
            this[type]+=1;
        }
        else{
            this[type]-=1;
        }
    }

}



//VARIABLES


var burger = new Burger();

ingSect = [
    {
        "name":"patties",
        "value":[
            {"name":"Chicken Patty","type":"patty","price":7},
            {"name":"Beef Patty","type":"patty","price":10},
            {"name":"Meatballs","type":"patty","price":12},
            {"name":"Pork Patty","type":"patty","price":10},
            {"name":"Vegan-Patty","type":"patty","price":15}
        ]
    },
    {
        "name":"veggies",
        "value":[
            {"name":"Tomato","type":"veggie","price":1},
            {"name":"Lettuce","type":"veggie","price":1},
            {"name":"Pickles","type":"veggie","price":1},
            {"name":"Cheese","type":"veggie","price":2},
            {"name":"Onion","type":"veggie","price":1},
            {"name":"Ham","type":"veggie","price":3},
            {"name":"Bacon","type":"veggie","price":3},
            {"name":"Vegan Cheese","type":"veggie","price":5},
            {"name":"Egg","type":"veggie","price":2.5},
            {"name":"Jalapeno pepper","type":"veggie","price":2}
        ]
    },
    {
        "name":"sauces",
        "value":[
            {"name":"Mayonnaise","type":"sauce","price":0.5},
            {"name":"Ketchup","type":"sauce","price":0.5},
            {"name":"Barbeque","type":"sauce","price":1},
            {"name":"Hot Sauce","type":"sauce","price":1},
            {"name":"Mustard","type":"sauce","price":1}
        ]
    }
]


// EVENT LISTENERS


//to change pages

const past = document.querySelector(".past");
const index = document.querySelector(".index");

past.addEventListener("click", function(){
    changePage('./past_burgers.html');

});
index.addEventListener("click", function(){
    changePage('./index.html');

});

const add = document.querySelector('.add-btn');
const ing = document.querySelector('.add-bur');

add.addEventListener('click', function(){//to remove the initial screen and go to the one where you can make your burger
    
    add.parentElement.classList.add('hidden');
    ing.classList.remove('hidden');

    initializeIndex();
}); 

function changePage(newpage){

    //function to switch between the pages
    document.location.href = newpage;

}



// FUNCTIONS


function initializeIndex() {

    //function to set up the main page

    console.log("index initialized");

    const chooseBurgerPart = document.querySelector('.cho-ing');

    for (let item of ingSect){

        //function to add every ingredient section (saved in ingSect)
        addIngredientSection(item, chooseBurgerPart); 

    }

    updatePrice();
    
    const finishButton = document.querySelector('.fin-btn');
    finishButton.onclick = function(){

        if(this.classList.contains('error')){
            this.classList.remove('error');
        }

        if(checkBurger(burger)){
            addBurgerToLocalStorage(burger);
            changePage('./index.html');
        }
        else{
            this.classList.add('error');
        }
    };

}

function checkBurger(burger){
    //function to check if burger is not too much of an abomination
    if(burger.patty > 0){
        return true;
    }
    window.alert("It's not a burger without a patty dude... Add at least one before proceeding.");
    return false;
}


function addIngredientSection(obj, section){
    
    const htmlSection = document.createElement('div'); //create a div for every type of ingredient

    htmlSection.classList.add(obj.name);  //adding a class to the type, in case of modifying the style 

    htmlSection.classList.add('ingredients');
    htmlSection.innerText = capitalize(obj.name);

    htmlSection.innerHTML += "<br>";
    
    for (let ingredient of obj.value){ //create the button to add each ingredient

        const ingredientButton = document.createElement('button');

        ingredientButton.onclick = function() {
                
            if(burger.addIngredient(ingredient)){
                addTOBURGER(ingredient); 
            }
        };

        ingredientButton.classList.add('pg-btn');
        ingredientButton.classList.add('ingredients');
        ingredientButton.innerText = ingredient.name + " (" + ingredient.price + "tl)";

        htmlSection.appendChild(ingredientButton);
    }

    section.appendChild(htmlSection);

}

function addTOBURGER(item){

    //function to add to visual burger

    let bun = document.querySelector('.top-bun');

    ingredient = document.createElement('div');

    ingredient.classList.add(item.name.toLowerCase().split(" ")[0]);
    ingredient.classList.add(item.type);

    ingredient.classList.add('ing');    

    bun.parentNode.insertBefore(ingredient, bun.nextSibling);

    ingredient.onclick = function(){
        
        burger.removeIngredient(item);
        this.remove();
        updatePrice();

    }

    updatePrice();
}

function updatePrice(){

    //function to update the price of the burger on the page

    const priceDiv = document.querySelector('.price');

    priceDiv.innerText = burger.price + " TL";
}


function capitalize(str){

    return str.charAt(0).toUpperCase() + str.slice(1);

}

function addBurgerToLocalStorage(burger){
    
    let burgers;

    if(localStorage.getItem('burgers') === null){
        burgers = [];
    }
    else{
        burgers = JSON.parse(localStorage.getItem('burgers'));
    }

    burgers.push(burger);
    localStorage.setItem('burgers', JSON.stringify(burgers));

}