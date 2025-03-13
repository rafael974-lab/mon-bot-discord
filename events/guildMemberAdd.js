module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        const logs = member.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);

        const accountAge = Date.now() - member.user.createdAt;
        const ageLimit = 1000 * 60 * 60 * 24 * 7; // 1 semaine

        if (accountAge < ageLimit) {
            await member.kick('Compte suspect (trop récent)');
            logs.send(`⚠️ **Expulsion automatique :** ${member.user.tag} (Compte trop récent)`);
        } else {
            logs.send(`✅ ${member.user.tag} a rejoint le serveur.`);
        }
    }
};
