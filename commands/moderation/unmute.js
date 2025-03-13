const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Avertit un utilisateur")
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("L'utilisateur à avertir")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription("Raison de l'avertissement")
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || "Aucune raison fournie";

        await interaction.reply(`⚠️ **${user.tag}** a reçu un avertissement : ${reason}`);
    },
};
