const fs = require('fs');

module.exports = (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);

        if (event.name && event.execute) {
            client.on(event.name, (...args) => event.execute(...args));
        } else {
            console.error(`⚠️ L'événement ${file} est mal exporté.`);
        }
    }
};
