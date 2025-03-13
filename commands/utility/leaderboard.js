const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './data/points.json';

// Vérification et création automatique du fichier `points.json`
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
}

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}, null, 2), 'utf8');
}

// Charger les points des joueurs
let points = JSON.parse(fs.readFileSync(path, 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Affiche le classement des membres avec le plus de points'),

    async execute(interaction) {
        if (Object.keys(points).length === 0) {
            return await interaction.reply('📉 Aucun point n’a été enregistré pour l’instant.');
        }

        // Trier les joueurs du plus grand au plus petit score
        const sorted = Object.entries(points).sort((a, b) => b[1] - a[1]);

        // Générer un classement des 10 meilleurs joueurs
        const topPlayers = sorted.slice(0, 10).map(([user, pts], index) => {
            return `**${index + 1}. <@${user}>** - ${pts} points`;
        }).join("\n");

        await interaction.reply(`🏆 **Classement des meilleurs membres :**\n\n${topPlayers}`);
    }
};
