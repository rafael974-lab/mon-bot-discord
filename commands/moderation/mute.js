const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                .setDescription("L'utilisateur à rendre muet")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return interaction.reply({ content: "Utilisateur introuvable.", ephemeral: true });

        await member.timeout(10 * 60 * 1000); // 10 minutes
        await interaction.reply(`🔇 **${user.tag}** a été **muté** pour 10 minutes.`);
    },
};
