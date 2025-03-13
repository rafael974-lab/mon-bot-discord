const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockchannel')
        .setDescription('Verrouille le canal actuel pour tous les utilisateurs.')
        .addBooleanOption(option =>
            option.setName('lock')
                .setDescription('True pour verrouiller, false pour déverrouiller')
                .setRequired(true)),
    
    async execute(interaction) {
        const lock = interaction.options.getBoolean('lock');
        const channel = interaction.channel;

        if (lock) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false
            }).then(() => {
                interaction.reply({ content: 'Le canal a été verrouillé.', ephemeral: true });
            }).catch(error => {
                console.error(error);
                interaction.reply({ content: 'Erreur lors du verrouillage du canal.', ephemeral: true });
            });
        } else {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SEND_MESSAGES: null
            }).then(() => {
                interaction.reply({ content: 'Le canal a été déverrouillé.', ephemeral: true });
            }).catch(error => {
                console.error(error);
                interaction.reply({ content: 'Erreur lors du déverrouillage du canal.', ephemeral: true });
            });
        }
    },
};
