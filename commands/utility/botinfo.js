const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription("Affiche des informations sur le bot"),

    async execute(interaction) {
        await interaction.reply(`🤖 **Bot Name** : ${interaction.client.user.username}\n📅 **Créé le** : ${interaction.client.user.createdAt.toDateString()}`);
    },
};
