const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const pointsPath = path.join(__dirname, '../data/points.json');

// Fonction pour charger les points
function loadPoints() {
    try {
        const data = fs.readFileSync(pointsPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading the points file:", error);
        return {};  // Retourner un objet vide si le fichier n'existe pas ou en cas d'erreur
    }
}

// Fonction pour sauvegarder les points
function savePoints(points) {
    try {
        fs.writeFileSync(pointsPath, JSON.stringify(points, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing to the points file:", error);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('points')
        .setDescription('Manage points for users.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add points to a user.')
                .addUserOption(option => option.setName('user').setDescription('The user to add points to.').setRequired(true))
                .addIntegerOption(option => option.setName('amount').setDescription('Amount of points to add.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check points for a user.')
                .addUserOption(option => option.setName('user').setDescription('The user to check points for.').setRequired(false))),
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        const points = loadPoints();

        switch (subcommand) {
            case 'add':
                const amount = interaction.options.getInteger('amount');
                const userId = user.id;
                if (!points[userId]) {
                    points[userId] = 0;
                }
                points[userId] += amount;
                savePoints(points);
                await interaction.reply(`${amount} points added to ${user.username}. They now have ${points[userId]} points.`);
                break;

            case 'check':
                const pointsToCheck = points[user?.id] || 0;
                await interaction.reply(`${user ? user.username : 'You'} have ${pointsToCheck} points.`);
                break;
        }
    }
};
