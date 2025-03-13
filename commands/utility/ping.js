const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond avec Pong! et affiche le temps de latence.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Ping?', fetchReply: true });
        const timeDiff = (sent.createdTimestamp - interaction.createdTimestamp);
        interaction.editReply(`Pong! La latence est de ${timeDiff}ms. La latence API est de ${Math.round(interaction.client.ws.ping)}ms.`);
    },
};
