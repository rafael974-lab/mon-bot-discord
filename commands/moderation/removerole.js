// commands/removerole.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a specified role from a user.')
        .addUserOption(option => option.setName('user').setDescription('The user to remove the role from').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to remove').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: "You do not have permission to manage roles.", ephemeral: true });
        }
        try {
            await user.roles.remove(role);
            interaction.reply({ content: `Successfully removed ${role.name} from ${user.displayName}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error removing the role from the user.", ephemeral: true });
        }
    }
};
