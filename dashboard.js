const { Client } = require('discord.js');
const Dashboard = require('discord-dashboard');

const client = new Client({ intents: [3276799] });

const dashboard = new Dashboard(client, {
    port: 1194,
    client: {
        id: 'CLIENT_ID',  // Remplace par ton Client ID réel
        secret: 'CLIENT_SECRET'  // Remplace par ton Client Secret réel
    },
    redirectUri: 'http://192.168.1.19:1194/discord/callback',
    bot: {
        token: process.env.TOKEN,
        prefix: '!'
    }
});

dashboard.start();
