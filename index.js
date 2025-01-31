import GAMES_JSON from './games.js';

// Function to remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Reference to the games container element in the DOM
const gamesContainer = document.getElementById("games-container");

// Function to add game data to the page as cards
function addGamesToPage(games) {
    games.forEach(game => {
        // Create a new div element for each game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Set the inner HTML of the game card with the game's data
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged: </strong>$${game.pledged.toLocaleString()}</p>
            <p><strong>Goal: </strong>$${game.goal.toLocaleString()}</p>
            <p><strong>Backers: </strong>${game.backers.toLocaleString()}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    });
}

// Call the function to display all games on the page
addGamesToPage(GAMES_JSON);

// References to the summary statistic elements in the DOM
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Calculate the total number of contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Calculate the total amount of money raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Get the total number of games
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();

// Function to filter and display only unfunded games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

// Function to filter and display only funded games
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// Function to display all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// References to the filter buttons in the DOM
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to the filter buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Reference to the description container element in the DOM
const descriptionContainer = document.getElementById("description-container");

// Calculate the number of unfunded games
const unfundedgamescount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedgamescount} ${unfundedgamescount === 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`;

// Create a new paragraph element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);

// References to the top game containers in the DOM
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by the amount pledged in descending order and get the top two games
const sortedGames =  [...GAMES_JSON].sort((item1, item2) => item2.pledged - item1.pledged);
const [firstGame, secondGame] = sortedGames;

// Create and append elements to display the top two games
const firstGameElement = document.createElement("h3");
firstGameElement.innerHTML = `${firstGame.name} - $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("h3");
secondGameElement.innerHTML = `${secondGame.name} - $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);
