//Riot API Key
const apiKey = 'RGAPI-fa781e32-d4db-4213-b537-d8ef30d5381f';


import { generatedData } from "./apiFetch.js";
import { appendBAverage } from "./calcRank.js";

const numberOfPlayersInput = document.getElementById('numberOfPlayers');
const container = document.getElementById('playerStatsInputs');
const form = document.getElementById('playerStatsForm');
const selectElement = document.getElementById('champions');
const sortMethodSelect = document.getElementById('sortMethod');
let filteredData;

// Create player input fields
function createPlayerInputFields(numberOfPlayers, container) {
    container.innerHTML = '';
    for (let i = 1; i <= numberOfPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Username for Player ${i}`;
        input.id = `playerStat${i}`;
        input.className = `player-stat player-stat-${i}`;

        if (i % 2 === 1) {
            const row = document.createElement('div');
            row.className = 'input-row';
            container.appendChild(row);
        }

        container.lastElementChild.appendChild(input);
    }
}

// Event listener for champion selection change
selectElement.addEventListener('change', function() {
    const selectedChampion = this.value;
    filteredData = generatedData.filter(player => player.Champion === selectedChampion);
    appendBAverage(filteredData);
});

// Event listener for number of players input change
numberOfPlayersInput.addEventListener('change', function() {
    const numberOfPlayers = parseInt(this.value, 10);
    createPlayerInputFields(numberOfPlayers, container);
});

// Function to fetch match details for a player
async function getMatches(puuid) {
    const matchEndpoint = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=25&api_key=${apiKey}`;
    try {
        const response = await fetch(matchEndpoint);
        if (!response.ok) throw new Error(`Error fetching matchlist: ${response.status}`);
        const matchlistData = await response.json();
        let matchDetails = [];
        for (let matchId of matchlistData) {
            const matchData = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`).then(res => res.json());
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
        return [];
    }
}

// Function to filter matches by selected champion
function filterByChamp(matchesData) {
    const selectedChampion = selectElement.value;
    return matchesData.map(playerMatches => playerMatches.filter(match => match.championName === selectedChampion))
                      .filter(playerMatches => playerMatches.length > 0);
}

// Function to process match data
function processMatchData(filteredMatches) {
    return filteredMatches.map((playerMatches, index) => {
        if (playerMatches.length === 0) return null;
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
            KDA: kda.toFixed(2)
        };
    }).filter(playerData => playerData !== null);
}

// Form submission event listener
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    let playerStatsPromises = [];
    for (let i = 1; i <= parseInt(numberOfPlayersInput.value, 10); i++) {
        const input = document.getElementById(`playerStat${i}`);
        if (input && input.value) {
            const endpoint = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.value}?api_key=${apiKey}`;
            playerStatsPromises.push(axios.get(endpoint));
        }
    }

    try {
        const responses = await Promise.all(playerStatsPromises);
        const playerStats = responses.map(response => response.status === 200 ? response.data : null).filter(data => data != null);
        const matchesData = await Promise.all(playerStats.map(playerStat => getMatches(playerStat.puuid)));
        const final = [...filterByChamp(matchesData), ...filteredData];
        localStorage.setItem('playerStats', JSON.stringify(final));
        window.location.href = `leaderboard.html?sortMethod=${encodeURIComponent(sortMethodSelect.value)}`;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
});

export { filteredData };