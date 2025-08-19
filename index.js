/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data'

    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div for the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Set inner HTML with game info and image
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the card to the container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// DISPLAY ALL GAMES WHEN THE PAGE LOADS
addGamesToPage(GAMES_JSON);


// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // return the array for Secret Key component
    return unfundedGames;
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);

    // return the array for Secret Key component
    return fundedGames;
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Secret Key components from this challenge
 */

// Component 1: number of unfunded games
const component1 = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log("Unfunded games:", component1);

// Component 2: number of funded games
const component2 = GAMES_JSON.filter(game => game.pledged >= game.goal).length;
console.log("Funded games:", component2);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Step 1: Count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Step 2: Get total games and total pledged amount
const totalGames = GAMES_JSON.length;
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Step 3: Create the display string in the requested format
const descriptionText = `A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} ${totalGames === 1 ? 'game' : 'games'}. Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`;

// Step 4: Create a new paragraph element and add it to the description container
const infoParagraph = document.createElement("p");
infoParagraph.innerHTML = descriptionText;
descriptionContainer.appendChild(infoParagraph);



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Step 1: Calculating the Top Games
// Use destructuring and the spread operator to grab the first and second games from the sortedGames list
const [firstGame, secondGame, ...otherGames] = sortedGames;

// Create a new element that contains the name of the top funded game and append it to firstGameContainer
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// Do the same for the second most funded game, appending it to the secondGameContainer
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);