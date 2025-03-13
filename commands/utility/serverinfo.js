const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche les informations du serveur'),
    async execute(interaction) {
        const { guild } = interaction;
        await interaction.reply(`📌 Nom du serveur : ${guild.name}\n👥 Membres : ${guild.memberCount}`);
    },
};
