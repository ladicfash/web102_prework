/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

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

const gamesContainer = document.getElementById("games-container");

// function to add all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged: </strong>$${game.pledged.toLocaleString()}</p>
            <p><strong>Goal: </strong>$${game.goal.toLocaleString()}</p>
            <p><strong>Backers: </strong>${game.backers.toLocaleString()}</p>
        `;

        gamesContainer.appendChild(gameCard);
    });
}

// Call the function to display all games
addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page
 * displaying the total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();

/*****************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6: Add more information about the company
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const descriptionText = `We currently have ${unfundedCount} ${unfundedCount === 1 ? 'unfunded game' : 'unfunded games'}.`;
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
*/

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);
const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement("h3");
firstGameElement.innerHTML = `${firstGame.name} - $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("h3");
secondGameElement.innerHTML = `${secondGame.name} - $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);

/*****************************************************************************
 * Kickstarter Games Section
 * Skills used: DOM manipulation, fetch, template literals
*/

const kickstarterContainer = document.getElementById("kickstarter-games-container");

// Fetch data for Kickstarter games from a JSON file or API
function fetchKickstarterGames() {
    // Replace with actual URL or static data for Kickstarter games
    fetch('/path/to/kickstarter-games.json')
        .then(response => response.json())
        .then(kickstarterGames => {
            kickstarterGames.forEach(game => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");

                gameCard.innerHTML = `
                    <img class="game-img" src="${game.img}" alt="${game.name}" />
                    <h3>${game.name}</h3>
                    <p>${game.description}</p>
                    <p><strong>Pledged: </strong>$${game.pledged.toLocaleString()}</p>
                    <p><strong>Goal: </strong>$${game.goal.toLocaleString()}</p>
                    <p><strong>Backers: </strong>${game.backers.toLocaleString()}</p>
                `;

                kickstarterContainer.appendChild(gameCard);
            });
        })
        .catch(error => {
            console.error('Error fetching Kickstarter games:', error);
        });
}

fetchKickstarterGames();

