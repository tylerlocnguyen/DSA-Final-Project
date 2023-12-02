import { filteredData } from "./script.js";


//we use Bayesian average.
function calculateRankingScore(winRate, gamesPlayed, constant = 30, baseRate = 0.5) {
    if (winRate > 1) winRate = winRate / 100;
    return ((winRate * gamesPlayed) / (gamesPlayed + constant)) + ((constant * baseRate) / (gamesPlayed + constant));
}


function appendBAverage(){

// Calculating Bayesian average for each player and appending it to the object
filteredData.forEach(player => {
    player.bAverage = calculateRankingScore(player.WinRate, player.GamesPlayed);
});

console.log(filteredData);

}

export{appendBAverage};





