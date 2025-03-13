// commands/addrole.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds a specified role to a user.')
        .addUserOption(option => option.setName('user').setDescription('The user to give the role to').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to give').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: "You do not have permission to manage roles.", ephemeral: true });
        }
        try {
            await user.roles.add(role);
            interaction.reply({ content: `Successfully added ${role.name} to ${user.displayName}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error adding the role to the user.", ephemeral: true });
        }
    }
};
