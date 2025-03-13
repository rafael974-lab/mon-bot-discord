const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste des commandes'),

    async execute(interaction) {
        await interaction.reply(
            "📋 **Liste des commandes :**\n" +
            "- `/ping` → Vérifier si le bot est actif\n" +
            "- `/serverinfo` → Infos sur le serveur\n" +
            "- `/userinfo` → Infos sur un utilisateur\n" +
            "- `/kick` → Expulser un utilisateur\n" +
            "- `/ban` → Bannir un utilisateur\n" +
            "- `/mute` → Rendre un utilisateur muet\n" +
            "- `/unmute` → Rétablir la parole"
        );
    },
};
