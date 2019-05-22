
function explore(timer) {
    exploring = true;
    onTask = true;
    // Add to situation list
    var newItem = document.createElement("LI");
    var textnode = document.createTextNode("[EXPLORE]  You head out to explore the area...");
    newItem.appendChild(textnode);
    var list = document.getElementById("situations-list");
    list.insertBefore(newItem, list.childNodes[0]);

    setTimeout(function() {
        // Success rate
        if (playerHealth.value <= 20) {
            var diceRoll = Math.floor(Math.random() * 6 + 1);
            if (diceRoll === 4 || diceRoll === 5) {
                // Add to situation list
                var newItem = document.createElement("LI");
                var textnode = document.createTextNode("[EXPLORE]  You explored the area. Found minor items. Your health decreases");
                newItem.appendChild(textnode);
                var list = document.getElementById("situations-list");
                list.insertBefore(newItem, list.childNodes[0]);

                // Decrease the stats
                playerHealth.value -= Math.floor(Math.random() *15);
                playerHunger.value -= Math.floor(Math.random() * 15);
                playerThirst.value -= Math.floor(Math.random() * 15);

            } else {
                // Add to situation list
                var newItem = document.createElement("LI");
                var textnode = document.createTextNode("[EXPLORE]  You explored the area. Found nothing useful. Your health decreases");
                newItem.appendChild(textnode);
                var list = document.getElementById("situations-list");
                list.insertBefore(newItem, list.childNodes[0]);

                // Decrease the stats
                playerHealth.value -= Math.floor(Math.random() *15);
                playerHunger.value -= Math.floor(Math.random() * 15);
                playerThirst.value -= Math.floor(Math.random() * 15);

            }
        }

        if (playerHealth.value >= 21) {
            // Add to situation list
            var newItem = document.createElement("LI");
            var textnode = document.createTextNode("[EXPLORE]  You explored the area. Found useful items. Your health decreases");
            newItem.appendChild(textnode);
            var list = document.getElementById("situations-list");
            list.insertBefore(newItem, list.childNodes[0]);

            // Decrease the stats
            playerHealth.value -= Math.floor(Math.random() *10);
            playerHunger.value -= Math.floor(Math.random() * 10);
            playerThirst.value -= Math.floor(Math.random() * 10);       

        }

        exploring = false;
        onTask = false;

    }, timer);
}


function handleEatDrink(timer) {
    onTask = true;
    // Add to situation list
    var newItem = document.createElement("LI");
    var textnode = document.createTextNode("[PLAYER]  You start preparing food/drink...");
    newItem.appendChild(textnode);
    var list = document.getElementById("situations-list");
    list.insertBefore(newItem, list.childNodes[0]);

    setTimeout(function() {
    
        // Add to situation list
        var newItem = document.createElement("LI");
        var textnode = document.createTextNode("[PLAYER]  You eat some food and drink some water. You feel better. Your health increases a little.");
        newItem.appendChild(textnode);
        var list = document.getElementById("situations-list");
        list.insertBefore(newItem, list.childNodes[0]);

        playerHunger.value += Math.floor(Math.random() * 15);
        playerThirst.value += Math.floor(Math.random() * 15);
        playerHealth.value += Math.floor(Math.random() * 8);

        onTask = false;
    
    }, timer)

}


function handleSleep(timer) {
    onTask = true;
    // Add to situation list
    var newItem = document.createElement("LI");
    var textnode = document.createTextNode("[PLAYER]  You start to rest...");
    newItem.appendChild(textnode);
    var list = document.getElementById("situations-list");
    list.insertBefore(newItem, list.childNodes[0]);

    setTimeout(function(){
        // Add to situation list
        var newItem = document.createElement("LI");
        var textnode = document.createTextNode("[PLAYER]  You rest for 6 hours. You feel energized. Getting a good rest is a must if you want to survive.");
        newItem.appendChild(textnode);
        var list = document.getElementById("situations-list");
        list.insertBefore(newItem, list.childNodes[0]);

        playerHealth.value += Math.floor(Math.random() *15);
        playerHunger.value -= Math.floor(Math.random() * 10);
        playerThirst.value -= Math.floor(Math.random() * 10);

        onTask = false;

    }, timer)
}


function checkDeath() {
    if (exploring) {
        if (playerHealth.value <= 1 || playerThirst.value <= 1 || playerHunger.value <= 1) {
            handleDeath("explore");
        }
    }

    if (playerHunger.value <= 1) {
        handleDeath("hunger");
    }

    if (playerThirst.value <= 1) {
        handleDeath("thirst");
    }
}


function handleDeath(ending) {

    // Ending type
    switch (ending) {
        case "explore":
            // Add to situation list
            var newItem = document.createElement("LI");
            var textnode = document.createTextNode("Your health decreases and you could not continue your journey. You lay wasted on an unknown area. You survived x day(s). Your perseverence was great, but not great enough.");
            newItem.appendChild(textnode);
            var list = document.getElementById("situations-list");
            list.insertBefore(newItem, list.childNodes[0]);
            dead = true;
            disableBTN();
            break;

        case "hunger":
            // Add to situation list
            var newItem = document.createElement("LI");
            var textnode = document.createTextNode("[DEFEAT]  The lack of food has driven you to an end and you can no longer continue your journey. Your health decreases and you die of starvation. You survived x day(s). The lack of management or the lack of food can never help you survive. Better luck next time.");
            newItem.appendChild(textnode);
            var list = document.getElementById("situations-list");
            list.insertBefore(newItem, list.childNodes[0]);
            dead = true;
            disableBTN();
            break;

        case "thirst":
             // Add to situation list
             var newItem = document.createElement("LI");
             var textnode = document.createTextNode("[DEFEAT]  The lack of water has driven you to an end and you can no longer continue your journey. Your health decreases and you die of thirst. You survived x day(s). The lack of management or the lack of food can never help you survive. Better luck next time.");
             newItem.appendChild(textnode);
             var list = document.getElementById("situations-list");
             list.insertBefore(newItem, list.childNodes[0]);
             dead = true;
             disableBTN();
             break;
    }
}


function checkDay() {
    if (actions >= totalActions) {
        days ++;
        actions = 0;
        var daysremain = deadline - days;

        // Add to situation list
        var newItem = document.createElement("LI");
        var textnode = document.createTextNode("[WORLD]  A day has passed. " + daysremain + " day(s) left!");
        newItem.appendChild(textnode);
        var list = document.getElementById("situations-list");
        list.insertBefore(newItem, list.childNodes[0]);

        dayTag.textContent = "Day: " + days;
        daysRemainTag.textContent = "Day(s) left: " + daysremain;

    }
    if (days >= deadline) {
        // Add to situation list
        var newItem = document.createElement("LI");
        var textnode = document.createTextNode("[END]  It is " + days + "th day. You have failed to find rescue and you have been defeated." );
        newItem.appendChild(textnode);
        var list = document.getElementById("situations-list");
        list.insertBefore(newItem, list.childNodes[0]);
        dead = true;
    }
}

function checkHour() {
    hoursTag.textContent = "Hour(s) Left: " + (totalActions - actions);
    
    if (actions <= 0) {
        hoursTag.textContent = "Hour(s) Left: " + actions;
    }
}