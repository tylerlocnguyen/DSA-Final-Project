import { countingSort } from "./countingSort.js";
import { radixSort } from "./radixSort.js";

window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedSortMethod = urlParams.get('sortMethod');
    const playerStats = JSON.parse(localStorage.getItem('playerStats'));
    const leaderboardContainer = document.getElementById('leaderboard'); 

    if (playerStats) {
        let sortedPlayers;

        // Sorting based on the selected method
        if (selectedSortMethod === "countingSort") {
            // Assuming the range of bAverage is from 0 to 1
            const maxValue = 100; // Since bAverage is scaled by 100
            sortedPlayers = countingSort(playerStats, maxValue);
            console.log(sortedPlayers)
     
        }      
        else if (selectedSortMethod === "radixSort") {
            sortedPlayers = radixSort(playerStats);
        } else {
            // Default sorting or no sorting
            sortedPlayers = playerStats;
        }

        // Generate leaderboard entries
        sortedPlayers.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player-entry');

            if (player.colorTag === 'yellow') {
                playerDiv.style.backgroundColor = 'yellow';
            } else {
                playerDiv.style.backgroundColor = 'lightblue';
            }

            const rank = index + 1;

            playerDiv.innerHTML = `
                <h3>Rank: ${rank}</h3>
                <p>Champion: ${player.Champion}</p>
                <p>Games Played: ${player.GamesPlayed}</p>
                <p>KDA: ${player.KDA}</p>
                <p>Player Name: ${player.PlayerName}</p>
                <p>Win Rate: ${player.WinRate}</p>
                <p>bAverage: ${player.bAverage}</p>
            `;

            leaderboardContainer.appendChild(playerDiv);
        });
    }
});


    






