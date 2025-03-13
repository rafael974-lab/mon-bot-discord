module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
      if (!interaction.isCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
          console.error(`Aucune commande trouvée pour ${interaction.commandName}`);
          return;
      }

      try {
          await command.execute(interaction);
      } catch (error) {
          console.error(`Erreur lors de l'exécution de ${interaction.commandName} :`, error);
          await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
      }
  },
};
