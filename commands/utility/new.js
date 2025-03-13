const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const API_KEY = 'AIzaSyCHXmUU2xmleIGTkemQ0kmvs1rye1WExK8'; // Remplace avec ta clé API NewsAPI

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Affiche les dernières actualités sur un sujet')
        .addStringOption(option =>
            option.setName('sujet')
                .setDescription('Sujet des actualités')
                .setRequired(true)),

    async execute(interaction) {
        const sujet = interaction.options.getString('sujet');
        const url = `https://newsapi.org/v2/everything?q=${sujet}&apiKey=${API_KEY}&language=fr&pageSize=3`;

        try {
            const response = await axios.get(url);
            const articles = response.data.articles.slice(0, 3); // Prend les 3 premières actualités

            if (articles.length === 0) {
                return await interaction.reply(`❌ Aucune actualité trouvée sur **${sujet}**.`);
            }

            let newsMessage = articles.map((article, index) => 
                `**#${index + 1}** [${article.title}](${article.url}) - *${article.source.name}*`
            ).join('\n');

            await interaction.reply(`📰 **Actualités sur ${sujet} :**\n\n${newsMessage}`);
        } catch (error) {
            await interaction.reply(`❌ Erreur lors de la récupération des actualités.`);
        }
    }
};
