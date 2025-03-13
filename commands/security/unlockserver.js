const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlockserver')
        .setDescription('Déverrouille tous les salons du serveur')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        interaction.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: true
            });
        });

        await interaction.reply("🔓 Tous les salons ont été déverrouillés !");
    },
};
