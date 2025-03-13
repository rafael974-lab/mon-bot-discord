const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pool')
        .setDescription('Crée un sondage simple')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('La question du sondage')
                .setRequired(true)),
    
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.reply(`📊 **Sondage** : ${question} \n✅ Oui | ❌ Non`);
    },
};
