function scaleValue(value, scale) {
    return Math.floor(value * scale);
}

function initializeCountArray(maxValue) {
    return new Array(maxValue + 1).fill(0);
}

function populateCountArray(arr, countArray, scale) {
    arr.forEach(player => {
        let scaledValue = scaleValue(player.bAverage, scale);
        countArray[scaledValue]++;
    });
}

function accumulateCounts(countArray) {
    for (let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }
}

function createSortedArray(arr, countArray, scale) {
    let sortedArray = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        let scaledValue = scaleValue(arr[i].bAverage, scale);
        sortedArray[countArray[scaledValue] - 1] = arr[i];
        countArray[scaledValue]--;
    }
    return sortedArray.reverse();
}

function countingSort(players, scale = 100) {
    let maxValue = scaleValue(1, scale); // Assuming bAverage ranges from 0 to 1
    let countArray = initializeCountArray(maxValue);
    populateCountArray(players, countArray, scale);
    accumulateCounts(countArray);
    return createSortedArray(players, countArray, scale);
}

export { countingSort };