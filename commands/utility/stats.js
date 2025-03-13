const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription("Affiche les statistiques du serveur"),

    async execute(interaction) {
        const { guild } = interaction;
        const embed = {
            title: `📊 Statistiques de ${guild.name}`,
            fields: [
                { name: "👥 Membres", value: `${guild.memberCount}`, inline: true },
                { name: "🆔 ID", value: guild.id, inline: true }
            ],
            color: 0x0099ff
        };

        await interaction.reply({ embeds: [embed] });
    },
};
