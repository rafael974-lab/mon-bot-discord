const fs = require('fs');
const path = './data/points.json';

// Vérification et création automatique du fichier `points.json`
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
}

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}), 'utf8');
}

// Charger les points des joueurs
let points = JSON.parse(fs.readFileSync(path, 'utf8'));

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return; // Ignore les bots

        // 🔹 Auto-moderation : Détection de spam
        const suspiciousKeywords = ['discord.gg/', 'http', 'free nitro', 'gift', 'discord-nitro'];
        if (suspiciousKeywords.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete();
            return message.channel.send(`⚠️ ${message.author}, ton message a été supprimé pour contenu suspect.`);
        }

        // 🔹 Système de points : Chaque message donne 1 point
        if (!points[message.author.id]) {
            points[message.author.id] = 0;
        }
        points[message.author.id] += 1;

        // Sauvegarde des points dans points.json
        fs.writeFileSync(path, JSON.stringify(points, null, 2), 'utf8');

        // 🔹 Vérification du score (récompense)
        if (points[message.author.id] % 10 === 0) { // Tous les 10 messages
            message.channel.send(`🎉 Félicitations ${message.author}, tu as maintenant **${points[message.author.id]}** points !`);
        }

        // 🔹 Log des messages dans la console
        console.log(`📩 Message de ${message.author.tag} : ${message.content}`);
    },
};
