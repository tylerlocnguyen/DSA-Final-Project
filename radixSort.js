function extractDigit(num, place, base = 10) {
    return Math.floor((num / Math.pow(base, place)) % base);
}

function normalizeNumber(num, scale) {
    return Math.floor(num * scale);
}

function countDigits(num) {
    return num === 0 ? 1 : Math.ceil(Math.log10(num + 1));
}

function calculateMaxDigits(nums) {
    return nums.reduce((max, num) => Math.max(max, countDigits(num)), 0);
}

function distributeToBuckets(arr, digitIndex, scale, base = 10) {
    let buckets = Array.from({ length: base }, () => []);
    arr.forEach(item => {
        let digit = extractDigit(normalizeNumber(item.bAverage, scale), digitIndex, base);
        buckets[digit].push(item);
    });
    return buckets;
}

function flattenBuckets(buckets) {
    return buckets.reduce((flattened, bucket) => flattened.concat(bucket), []);
}

function radixSort(players, scale = 10000, base = 10) {
    let maxDigits = calculateMaxDigits(players.map(player => normalizeNumber(player.bAverage, scale)));

    for (let k = 0; k < maxDigits; k++) {
        let buckets = distributeToBuckets(players, k, scale, base);
        // Start concatenating from the last bucket to sort in descending order
        players = [];
        for (let j = buckets.length - 1; j >= 0; j--) {
            players = players.concat(buckets[j]);
        }
    }
    return players;
}

export { radixSort };
