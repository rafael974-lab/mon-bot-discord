const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockserver')
        .setDescription("Verrouille tout le serveur (désactive les messages)")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        interaction.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });
        });

        await interaction.reply('🔒 **Tous les salons ont été verrouillés.**');
    },
};
