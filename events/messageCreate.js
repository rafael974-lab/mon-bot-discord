module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (!message || !message.author) return; // Vérifie que le message est bien défini
        if (message.author.bot) return; // Ignore les messages des bots

        console.log(`📩 Message reçu de ${message.author.tag} : ${message.content}`);
    },
};
