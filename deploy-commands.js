require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

if (!token || !clientId) {
    console.error("Erreur de configuration : CLIENT_ID ou TOKEN manquant.");
    process.exit(1);
}

const commands = [];
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`./commands/${folder}/${file}`);
            if (command.data) {
                commands.push(command.data.toJSON());
                console.log(`✅ Commande chargée : ${command.data.name}`);
            } else {
                console.log(`⚠️ La commande "${file}" dans "${folder}" n'est pas correctement exportée et sera ignorée.`);
            }
        } catch (e) {
            console.error(`Erreur lors du chargement de la commande "${file}" : ${e.message}`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🗑 Suppression de toutes les commandes enregistrées globalement...');
        const deleteResponse = await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('✅ Toutes les commandes globales ont été supprimées.', deleteResponse);

        console.log('🚀 Déploiement des nouvelles commandes globalement...');
        const deployResponse = await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log(`✅ ${commands.length} commandes ont été déployées avec succès.`, deployResponse);
    } catch (error) {
        console.error('❌ Erreur lors du déploiement des commandes :', error);
    }
})();
