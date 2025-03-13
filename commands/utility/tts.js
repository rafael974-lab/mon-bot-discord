const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription("Convertit un texte en voix")
        .addStringOption(option =>
            option.setName('texte')
                .setDescription("Le texte à convertir en voix")
                .setRequired(true)),

    async execute(interaction) {
        const texte = interaction.options.getString('texte');
        await interaction.deferReply();

        try {
            const response = await axios.post('https://api.openai.com/v1/audio/speech', {
                model: 'tts-1',
                input: texte,
                voice: 'alloy'
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer' // Pour récupérer le fichier audio
            });

            await interaction.editReply({ 
                content: "🔊 Voici ton audio :",
                files: [{ attachment: Buffer.from(response.data), name: 'tts.mp3' }]
            });
        } catch (error) {
            console.error("Erreur OpenAI:", error);
            await interaction.editReply("❌ Erreur lors de la conversion en voix.");
        }
    }
};
