// translate.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text from one language to another.')
        .addStringOption(option => option.setName('text').setDescription('Text to translate').setRequired(true))
        .addStringOption(option => option.setName('to').setDescription('Language to translate to').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const to = interaction.options.getString('to');
        const apiKey = process.env.TRANSLATE_API_KEY; // Assure-toi que cette clé est définie dans ton fichier .env
        const url = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(text)}&target_lang=${to}`;

        try {
            const response = await axios.post(url);
            const translatedText = response.data.translations[0].text;
            interaction.reply({ content: `Translated text: ${translatedText}`, ephemeral: true });
        } catch (error) {
            interaction.reply({ content: `Error translating text: ${error.message}`, ephemeral: true });
        }
    }
};
