const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription("Expulse un utilisateur du serveur")
    .addUserOption(option =>
      option.setName('membre')
        .setDescription("L'utilisateur à expulser")
        .setRequired(true)),
  
  async execute(interaction) {
    const membre = interaction.options.getUser('membre');
    await interaction.reply(`${membre.tag} a été expulsé ! 🚀`);
  }
};
