const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Efface un nombre spécifié de messages.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Nombre de messages à supprimer')
                .setRequired(true)),
    
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Vous devez spécifier un nombre entre 1 et 100.', ephemeral: true });
        }

        const messages = await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'Il y a eu une erreur lors de la tentative de suppression des messages!', ephemeral: true });
        });

        if (messages) {
            interaction.reply({ content: `🧹 Effacé ${messages.size} messages.`, ephemeral: true });
        }
    },
};
