document.addEventListener('DOMContentLoaded', function () {
    const playerStats = JSON.parse(localStorage.getItem('playerStats'));
    console.log(playerStats)
    if (playerStats) {
        // Display the data on the page
        // For example, you could create a table and populate it with playerStats
        // ...
    }
});