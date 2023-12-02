

//SIMULATING API FETCH. 
function generateData() {
    const champions = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Azir", "Blitzcrank",
                       "Brand", "Braum", "Caitlyn", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo",
                       "Draven", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank",
                       "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV",
                       "Jax", "Jayce", "Jinx", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen",
                       "Kha'Zix", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lissandra", "Lucian", "Lulu", "Lux",
                       "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami",
                       "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy",
                       "Quinn", "Rammus", "Rek'Sai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani",
                       "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain",
                       "Syndra", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate",
                       "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vi", "Viktor", "Vladimir",
                       "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yasuo", "Yorick", "Zac", "Zed", "Ziggs",
                       "Zilean", "Zyra", "Bard", "Ekko", "Tahm Kench", "Kindred", "Illaoi", "Jhin", "Aurelion Sol",
                       "Taliyah", "Kled", "Ivern", "Camille", "Rakan", "Xayah", "Kayn", "Ornn", "Zoe", "Kai'Sa", "Pyke",
                       "Neeko", "Sylas", "Yuumi", "Qiyana", "Senna", "Aphelios", "Sett", "Lillia", "Yone", "Samira",
                       "Seraphine", "Rell", "Viego", "Gwen", "Akshan", "Vex"];
    const data = [];
    const existingNames = new Set();

    for (let i = 0; i < 100000; i++) {
        const playerData = {
            PlayerName: generatePlayerName(existingNames),
            Champion: champions[Math.floor(Math.random() * champions.length)],
            WinRate: parseFloat((Math.random() * 100).toFixed(2)),
            KDA: parseFloat((Math.random() * 20).toFixed(2)),
            GamesPlayed: Math.floor(Math.random() * 1000) + 1
        };
        existingNames.add(playerData.PlayerName);
        data.push(playerData);
    }
    return data;
}

// Generate the data
const generatedData = generateData(); // this is an array.


// Example: Output the first 5 entries as test.
console.log(generatedData.slice(0, 5));