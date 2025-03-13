const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gameidea')
        .setDescription('Génère une idée de jeu vidéo originale')
        .addStringOption(option =>
            option.setName('genre')
                .setDescription('Choisis un genre de jeu (RPG, FPS, stratégie, etc.)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const genre = interaction.options.getString('genre') || "aléatoire";
        await interaction.deferReply();

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Tu es un expert en conception de jeux vidéo. Génère des idées originales de jeux." },
                    { role: "user", content: `Donne-moi une idée de jeu vidéo innovante dans le genre : ${genre}.` }
                ],
                max_tokens: 300
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            });

            const gameIdea = response.data.choices[0].message.content;
            await interaction.editReply(`🎮 **Idée de jeu vidéo :**\n${gameIdea}`);
        } catch (error) {
            console.error("Erreur OpenAI:", error);
            await interaction.editReply("❌ Erreur lors de la génération d'idée de jeu.");
        }
    },
};
