import { filteredData } from "./script.js";

function isSorted(players) {
    if (players.length < 2) {
        return true;
    }
    for (let i = 0; i < players.length - 1; i++) {
        if (players[i].bAverage > players[i + 1].bAverage) {
            return false;
        }
    }
    return true;
}
function bogosort(players) {
    let n = 0;
    while (!isSorted(players) && n < 10000) {
        shuffleArray(players);
        n++;
    }
    return players;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function appendRankingBogoSort(){
    // Based on sorted array, append rank
    const sortedData = bogosort(filteredData);
    filteredData.reverse().forEach((player, index) => {
        player.rank = index + 1;
    });

    console.log(filteredData);
    
}
    
export{appendRankingBogoSort};
    