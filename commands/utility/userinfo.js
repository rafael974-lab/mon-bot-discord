const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription("Affiche les informations d'un utilisateur")
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("L'utilisateur à afficher")
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;

        await interaction.reply(`👤 **Utilisateur** : ${user.tag}\n🆔 **ID** : ${user.id}`);
    },
};
