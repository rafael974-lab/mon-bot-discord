const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blague')
        .setDescription('Envoie une blague aléatoire'),

    async execute(interaction) {
        try {
            const response = await axios.get('https://www.blagues-api.fr/api/random', {
                headers: { 'Authorization': 'Bearer TA_CLE_API_BLAGUES' } // Remplace avec ta clé API
            });

            const blague = response.data;
            await interaction.reply(`😂 **Blague** : ${blague.joke}\n||${blague.answer}||`);
        } catch (error) {
            await interaction.reply('❌ Impossible de récupérer une blague.');
        }
    }
};
