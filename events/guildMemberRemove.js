module.exports = {
    name: 'guildMemberRemove',
    async execute(client, member) {
      const logs = member.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
      logs.send(`❌ ${member.user.tag} a quitté le serveur.`);
    }
  };
  