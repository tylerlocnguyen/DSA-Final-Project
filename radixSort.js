import { filteredData } from "./script.js";

function countingSort(array, place) {
    const size = array.length;
    const output = new Array(size).fill(0);
    const count = new Array(10).fill(0);

    // Calculate count of elements
    for (let i = 0; i < size; i++) {
        const index = Math.floor(array[i].bAverage * 1000 / place);
        count[index % 10]++;
    }

    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Place the elements in sorted order
    let i = size - 1;
    while (i >= 0) {
        const index = Math.floor(array[i].bAverage * 1000 / place);
        output[count[index % 10] - 1] = array[i];
        count[index % 10]--;
        i--;
    }

    for (let i = 0; i < size; i++) {
        array[i] = output[i];
    }
}

// Main function to implement radix sort
function radixSort(array) {
    // Get maximum element
    const maxElement = Math.max(...array.map(item => item.bAverage * 1000));

    // Apply counting sort to sort elements based on place value.
    let place = 1;
    while (Math.floor(maxElement / place) > 0) {
        countingSort(array, place);
        place *= 10;
    }

    return array;
}

function appendRankingRadixSort(){

    // Based on sorted array, append rank
    const sortedData = radixSort(filteredData);
    filteredData.reverse().forEach((player, index) => {
        player.rank = index + 1;
    });
    
    console.log(filteredData);
    
}
    
export{appendRankingRadixSort};
