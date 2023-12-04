import { generatedData } from "./apiFetch.js";
import { appendBAverage } from "./calcRank.js";

const numberOfPlayersInput = document.getElementById('numberOfPlayers');
const Container = document.getElementById('playerStatsInputs');
const form = document.getElementById('playerStatsForm');
const sortMethodSelect = document.getElementById('sortMethod');


function createPlayerInputFields(numberOfPlayers, container) {
    // Clear existing input fields
    container.innerHTML = '';

    // Create new input fields
    for (let i = 1; i <= numberOfPlayers; i++) {
        const input = document.createElement('input'); //append a class that is relative to 'i'
        input.type = 'text';
        input.placeholder = `Username for Player ${i}`;
        input.id = `playerStat${i}`;
        input.className = 'player-stat'; // For styling if needed

        input.className = `player-stat player-stat-${i}`;

        // Create a container for every pair of inputs
        if (i % 2 === 1) { // Start a new row for odd numbered inputs
            const row = document.createElement('div');
            row.className = 'input-row';
            container.appendChild(row);
        }

        const lastRow = container.lastElementChild;
        lastRow.appendChild(input);
    }
}



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
const apiKey = 'RGAPI-fa781e32-d4db-4213-b537-d8ef30d5381f';


    numberOfPlayersInput.addEventListener('change', function () {
        const numberOfPlayers = parseInt(this.value, 10);
        createPlayerInputFields(numberOfPlayers,Container);
    });



    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevents the default form submission action
    
        let playerStatsPromises = [];
        const numberOfPlayers = parseInt(numberOfPlayersInput.value, 10);
    
        for (let i = 1; i <= numberOfPlayers; i++) {
            const input = document.getElementById(`playerStat${i}`);
            if (input && input.value) {
                const summonerName = input.value;
                const endpoint = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
                playerStatsPromises.push(axios.get(endpoint));
            }
        }
    
        Promise.all(playerStatsPromises)
            .then(responses => {
                const playerStats = responses.map(response => response.status === 200 ? response.data : null).filter(data => data != null);
    
                // Process each player's matches
                return Promise.all(playerStats.map(playerStat => getMatches(playerStat.puuid)));
            })
            .then(matchesData => {
                // matchesData contains the results from getMatches

                
                matchesData = filterByChamp(matchesData)
                appendBAverage(matchesData);
                //console.log(matchesData);

                let final = [...matchesData,...filteredData]
                console.log(final)


                // Store the data in localStorage or sessionStorage
                 localStorage.setItem('playerStats', JSON.stringify(final));
                 const selectedMethod = sortMethodSelect.value;
                // Redirect to the leaderboard page
                  window.location.href = `leaderboard.html?sortMethod=${encodeURIComponent(selectedMethod)}`;

            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    });
    
    async function getMatches(puuid) {
        const matchEndpoint = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=25&api_key=${apiKey}`;
    
        try {
            const response = await fetch(matchEndpoint);
            if (!response.ok) {
                throw new Error(`Error fetching matchlist: ${response.status}`);
            }
            const matchlistData = await response.json();
    
            let matchDetails = [];
    
            for (let matchId of matchlistData) {
                const endpoint = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;
                const matchResponse = await fetch(endpoint);
                const matchData = await matchResponse.json();
    
                for (let player of matchData.info.participants) {
                    if (player.puuid === puuid) {
                        matchDetails.push({
                            championName: player.championName,
                            kills: player.kills,
                            deaths: player.deaths,
                            assists: player.assists,
                            win: player.win
                       
                        });
                    }
                }
            }
    
            return matchDetails;
        } catch (error) {
            console.error(error.message);
            return null; // Return null or appropriate error response
        }
    }


    function filterByChamp(matchesData) {
        const selectedChampion = selectElement.value;
        let filteredMatches = matchesData.map(playerMatches => 
            playerMatches.filter(match => match.championName === selectedChampion)
        );
    
        // Optionally remove any empty arrays if no matches were found for a player
        filteredMatches = filteredMatches.filter(playerMatches => playerMatches.length > 0);
    
        console.log(filteredMatches);
        filteredMatches = processMatchData(filteredMatches)
        return filteredMatches; // Return the array of arrays with filtered matches
    }



    function processMatchData(filteredMatches) {
        return filteredMatches.map((playerMatches, index) => {
            if (playerMatches.length === 0) return null; // Skip if no matches
    
            // Retrieve player name using the index provided by map function
            const playerNameInput = document.getElementById(`playerStat${index + 1}`);
            const playerName = playerNameInput ? playerNameInput.value : `Player ${index + 1}`;
    
            const gamesPlayed = playerMatches.length;
            const wins = playerMatches.filter(match => match.win).length;
            const winRate = (wins / gamesPlayed) * 100;
    
            let totalKills = 0, totalDeaths = 0, totalAssists = 0;
            playerMatches.forEach(match => {
                totalKills += match.kills;
                totalDeaths += match.deaths;
                totalAssists += match.assists;
            });
            const kda = totalDeaths === 0 ? (totalKills + totalAssists) : (totalKills + totalAssists) / totalDeaths;
    
            return {
                PlayerName: playerName,
                Champion: playerMatches[0].championName,
                GamesPlayed: gamesPlayed,
                WinRate: winRate.toFixed(2),
                KDA: kda.toFixed(2),
                colorTag: "yellow"
            };
        }).filter(playerData => playerData !== null); // Remove null entries
    }


export {filteredData};



