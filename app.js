// DOM Variables
var statusBTN = document.querySelector(".statusBTN");
var playerStatus = document.querySelector(".playerStatus");
var hungerBTN = document.querySelector(".hungerBTN");
var sleepBTN = document.querySelector(".sleepBTN");
var exploreBTN = document.querySelector(".exploreBTN");
var playerHunger = document.querySelector(".hunger");
var playerThirst = document.querySelector(".thirst");
var playerHealth = document.querySelector(".health");

var dayTag = document.querySelector("#dayTag");
var daysRemainTag = document.querySelector("#daysRemainTag");
var hoursTag = document.querySelector("#hoursTag");
var log = document.getElementById("situations-list")

var days = 1;
var deadline = 10;
var totalActions = 5;
var actions = 0;
var onTask = false;

// Game Variables
let exploring = false;
let dead = false;

// Check every 1 sec
setInterval(function () {
    if (dead == false) {
        checkDeath();
        checkDay();
        disableBTN();
    }
    if (onTask == true) {
        hungerBTN.disabled = true;
        sleepBTN.disabled = true;
        exploreBTN.disabled = true;
    }
    if (dead == true) {
        hungerBTN.disabled = true;
        sleepBTN.disabled = true;
        exploreBTN.disabled = true;
    }
}, 1000)


// DOM Manipulation
statusBTN.addEventListener("click", function() {
    if (dead == false) {
        playerStatus.classList.toggle("hide");
    }
    
});

// Eat/Drink
hungerBTN.addEventListener("click", function() {
    if (dead == false || onTask == false) {
        // Handle Eat/Drink
        handleEatDrink(Math.floor(Math.random() * 5) * 1000);
        actions ++;
        checkHour()
    }
    

    
});

// Sleep
sleepBTN.addEventListener("click", function() {
    if (dead == false || onTask == false) {
        handleSleep(Math.floor(Math.random() * 5) * 1000);
        actions ++;
        checkHour()
    }
    
});

// Explore
exploreBTN.addEventListener("click", function() {

    if (dead == false || onTask == false) {
        // handle exploration
        explore(Math.floor(Math.random() * 5) * 1000);
        actions ++;
        checkHour()   
    }

});










