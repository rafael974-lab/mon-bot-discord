module.exports = {
    name: 'guildAuditLogEntryCreate',
    async execute(client, auditLogEntry, guild) {
        const logs = guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
        logs.send(`📝 **Audit :** Action ${auditLogEntry.action} réalisée par ${auditLogEntry.executor.tag}.`);
    }
};
