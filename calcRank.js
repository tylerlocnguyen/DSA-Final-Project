import { filteredData } from "./script.js";


//we use Bayesian average.
function calculateRankingScore(winRate, gamesPlayed, constant = 30, baseRate = 0.5) {
    if (winRate > 1) winRate = winRate / 100;
    return ((winRate * gamesPlayed) / (gamesPlayed + constant)) + ((constant * baseRate) / (gamesPlayed + constant));
}


function appendBAverage(arr) {
    // Determine which array to use
    const dataArray = (arr && arr.length > 0) ? arr : filteredData;

    // Calculating Bayesian average for each player and appending it to the object
    dataArray.forEach(player => {
        player.bAverage = calculateRankingScore(player.WinRate, player.GamesPlayed);
    });

    console.log(dataArray);
}

export{appendBAverage};





