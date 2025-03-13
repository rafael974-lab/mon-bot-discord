const fs = require('fs');
const pointsFile = './data/points.json';

if (!fs.existsSync(pointsFile)) {
    fs.writeFileSync(pointsFile, JSON.stringify({}, null, 2));
}

let pointsData = JSON.parse(fs.readFileSync(pointsFile));

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const userId = message.author.id;

        if (!pointsData[userId]) pointsData[userId] = 0;
        pointsData[userId] += Math.floor(Math.random() * 5) + 1; // Ajoute 1-5 points aléatoirement

        fs.writeFileSync(pointsFile, JSON.stringify(pointsData, null, 2));
    }
};
