const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('correcteur')
        .setDescription('Corrige un texte avec GPT')
        .addStringOption(option =>
            option.setName('texte')
                .setDescription('Le texte à corriger')
                .setRequired(true)
        ),
    async execute(interaction) {
        const texte = interaction.options.getString('texte');
        await interaction.deferReply();

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Tu es un assistant qui corrige les fautes de grammaire et d'orthographe en français." },
                    { role: "user", content: `Corrige ce texte : "${texte}"` }
                ],
                max_tokens: 250
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            });

            const correction = response.data.choices[0].message.content;
            await interaction.editReply(`📖 **Texte corrigé :**\n${correction}`);
        } catch (error) {
            console.error("Erreur OpenAI:", error);
            await interaction.editReply("❌ Erreur lors de la correction du texte.");
        }
    },
};
