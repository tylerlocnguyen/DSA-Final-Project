import { generatedData } from "./apiFetch.js";
import { appendBAverage } from "./calcRank.js";

// Get the select element
const selectElement = document.getElementById('champions');
let filteredData;

// Add an event listener for the 'change' event
selectElement.addEventListener('change', function(event) {
    // Get the selected value
    const selectedChampion = event.target.value;

    // Do something with the selected value
    console.log('Selected Champion:', selectedChampion);

     filteredData = generatedData.filter(player => player.Champion === selectedChampion);
     appendBAverage();

});


//Riot API Key
const apiKey = 'RGAPI-88a580c8-88a6-42ee-a73f-82e2f5eee2a9';


document.addEventListener('DOMContentLoaded', function () {
    const numberOfPlayersInput = document.getElementById('numberOfPlayers');
    const playerStatsInputsContainer = document.getElementById('playerStatsInputs');
    const form = document.getElementById('playerStatsForm');

    

    numberOfPlayersInput.addEventListener('change', function () {
        const numberOfPlayers = parseInt(this.value, 10);

        // Clear existing input fields
        playerStatsInputsContainer.innerHTML = '';

        // Create new input fields
        for (let i = 1; i <= numberOfPlayers; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Username for Player ${i}`;
            input.id = `playerStat${i}`;
            input.className = 'player-stat'; // For styling if needed

                    // Create a container for every pair of inputs
        if (i % 2 === 1) { // Start a new row for odd numbered inputs
            const row = document.createElement('div');
            row.className = 'input-row';
            playerStatsInputsContainer.appendChild(row);
        }

        const lastRow = playerStatsInputsContainer.lastElementChild;
        lastRow.appendChild(input);
    
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevents the default form submission action

        const playerStats = [];

        // Loop through the number of players and collect their stats
        const numberOfPlayers = parseInt(numberOfPlayersInput.value, 10);
        for (let i = 1; i <= numberOfPlayers; i++) {
            const input = document.getElementById(`playerStat${i}`);
            if (input && input.value) { // Check if input exists and has a value

            // Prompt for summoner name (adjust for your environment, e.g., use a prompt in a browser)
            const summonerName = input.value

            // Example endpoint to get summoner information by name
            const endpoint = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;

            axios.get(endpoint).then(response => {
            if (response.status === 200) {
            const summonerData = response.data;
            playerStats.push(summonerData);
            }
         })
        .catch(error => {
        console.error(`Error: ${error.response.status}`);
        console.error(error.response.data);
    });
                
    }
}

        console.log(playerStats); // Output the array to console (for testing)
        // Here you can further process the array as needed
    });
});


export {filteredData};



