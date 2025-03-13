const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rappel')
        .setDescription('Planifie un rappel')
        .addStringOption(option =>
            option.setName('temps')
                .setDescription('Durée avant le rappel (ex: 5s, 10m, 1h)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message du rappel')
                .setRequired(true)),

    async execute(interaction) {
        const temps = interaction.options.getString('temps');
        const message = interaction.options.getString('message');

        const timeMatch = temps.match(/^(\d+)(s|m|h)$/);
        if (!timeMatch) return await interaction.reply('❌ Format invalide. Ex: `5s`, `10m`, `1h`');

        const value = parseInt(timeMatch[1]);
        const unit = timeMatch[2];
        let delay = unit === 's' ? value * 1000 : unit === 'm' ? value * 60000 : value * 3600000;

        await interaction.reply(`⏳ Rappel planifié dans **${temps}** !`);

        setTimeout(() => {
            interaction.followUp(`🔔 **Rappel** : ${message}`);
        }, delay);
    }
};
