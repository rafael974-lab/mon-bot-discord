const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('booksearch')
        .setDescription('Search for books')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Search query')
                .setRequired(true)),

    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const results = await searchBooks(query); // Supposons que cette fonction fait une requête API et renvoie les résultats
            if (!results || results.length === 0) {
                await interaction.reply('Failed to find any books.');
            } else {
                const reply = results.map(book => `${book.title} by ${book.author}`).join('\n');
                await interaction.reply(reply);
            }
        } catch (error) {
            console.error('Error searching books:', error);
            await interaction.reply('Failed to search books due to an internal error.');
        }
    }
};

async function searchBooks(query) {
    // Implémentez votre logique de recherche de livres ici, retournez un tableau d'objets livre
    return []; // Retournez un tableau vide si aucun livre n'est trouvé
}
