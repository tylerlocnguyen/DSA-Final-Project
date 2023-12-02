document.addEventListener('DOMContentLoaded', function () {
    const numberOfPlayersInput = document.getElementById('numberOfPlayers');
    const playerStatsInputsContainer = document.getElementById('playerStatsInputs');
    const form = document.getElementById('playerStatsForm');

    

    numberOfPlayersInput.addEventListener('change', function () {
        const numberOfPlayers = parseInt(this.value, 10);

        // Clear existing input fields
        playerStatsInputsContainer.innerHTML = '';

        // Create new input fields
        for (let i = 1; i <= numberOfPlayers; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Statistics for Player ${i}`;
            input.id = `playerStat${i}`;
            input.className = 'player-stat'; // For styling if needed

                    // Create a container for every pair of inputs
        if (i % 2 === 1) { // Start a new row for odd numbered inputs
            const row = document.createElement('div');
            row.className = 'input-row';
            playerStatsInputsContainer.appendChild(row);
        }

        const lastRow = playerStatsInputsContainer.lastElementChild;
        lastRow.appendChild(input);
    
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevents the default form submission action

        const playerStats = [];

        // Loop through the number of players and collect their stats
        const numberOfPlayers = parseInt(numberOfPlayersInput.value, 10);
        for (let i = 1; i <= numberOfPlayers; i++) {
            const input = document.getElementById(`playerStat${i}`);
            if (input && input.value) { // Check if input exists and has a value
                playerStats.push(input.value);
            }
        }

        console.log(playerStats); // Output the array to console (for testing)
        // Here you can further process the array as needed
    });
});



function generatePlayerName(existingNames) {
    let name = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    do {
        name = '';
        for (let i = 0; i < 8; i++) {
            name += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (existingNames.has(name)); // Keep generating until a unique name is found
    return name;
}
