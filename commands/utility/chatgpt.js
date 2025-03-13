const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('Pose une question à ChatGPT')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Votre question')
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.deferReply();

        if (!process.env.OPENAI_API_KEY) {
            return interaction.editReply("❌ API Key non trouvée ! Vérifie ton fichier `.env`.");
        }

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo", // Change en "gpt-4" si tu as accès
                messages: [{ role: "user", content: question }],
                max_tokens: 200
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            });

            const answer = response.data.choices[0].message.content;
            await interaction.editReply(`🤖 **ChatGPT:** ${answer}`);
        } catch (error) {
            console.error("Erreur OpenAI:", error.response ? error.response.data : error);
            await interaction.editReply("❌ Erreur lors de la communication avec OpenAI. Vérifie ton API Key et ton quota !");
        }
    },
};
