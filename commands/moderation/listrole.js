// commands/listroles.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listroles')
        .setDescription('Lists all roles of a specified user.')
        .addUserOption(option => option.setName('user').setDescription('The user to list roles for').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getMember('user') || interaction.member;
        const roles = user.roles.cache.map(role => role.name).join(', ');
        interaction.reply({ content: `${user.displayName} has the following roles: ${roles}`, ephemeral: true });
    }
};
