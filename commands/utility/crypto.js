const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crypto')
        .setDescription('Affiche le prix actuel d\'une crypto-monnaie')
        .addStringOption(option =>
            option.setName('monnaie')
                .setDescription('Nom de la crypto (ex: bitcoin, ethereum)')
                .setRequired(true)),

    async execute(interaction) {
        const monnaie = interaction.options.getString('monnaie').toLowerCase();
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${monnaie}&vs_currencies=eur`;

        try {
            const response = await axios.get(url);
            if (!response.data[monnaie]) {
                return await interaction.reply(`❌ Crypto-monnaie **${monnaie}** introuvable.`);
            }

            const prix = response.data[monnaie].eur;
            await interaction.reply(`💰 **${monnaie.toUpperCase()}** coûte actuellement **${prix}€**.`);
        } catch (error) {
            await interaction.reply(`❌ Erreur lors de la récupération du prix.`);
        }
    }
};
