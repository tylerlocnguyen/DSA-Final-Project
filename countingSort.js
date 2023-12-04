function countingSort(arr, maxValue) {
    let countArray = new Array(maxValue + 1).fill(0);
    let outputArray = new Array(arr.length);

    // Fill countArray with the frequency of each value
    arr.forEach(player => {
        let scaledValue = Math.floor(player.bAverage * 100); // Scaling bAverage
        countArray[scaledValue]++;
    });

    // Modify countArray to have positions of each value
    for (let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
        let scaledValue = Math.floor(arr[i].bAverage * 100); // Scaling bAverage
        outputArray[countArray[scaledValue] - 1] = arr[i];
        countArray[scaledValue]--;
    }

    return outputArray;
}

export {countingSort};