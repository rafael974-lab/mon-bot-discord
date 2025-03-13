// ban.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);
        
        if (!member) {
            return interaction.reply({ content: "User is not in the server.", ephemeral: true });
        }
        member.ban({ reason })
            .then(() => interaction.reply({ content: `${user.tag} has been banned for: ${reason}`, ephemeral: true }))
            .catch(error => interaction.reply({ content: `Failed to ban ${user.tag}: ${error}`, ephemeral: true }));
    }
};
