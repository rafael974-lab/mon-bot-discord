require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Gestion des messages pour détecter le spam
let lastMessage = {};
let repeatCount = {};

client.on('messageCreate', message => {
    if (!message.guild || message.author.bot) return;

    const key = `${message.guild.id}-${message.author.id}`;
    const now = Date.now();
    const timestamp = lastMessage[key] || now;
    const timeDiff = now - timestamp;
    const content = message.content;

    if (!repeatCount[key]) repeatCount[key] = [];
    if (timeDiff < 2000 && content === repeatCount[key][repeatCount[key].length - 1]) {
        repeatCount[key].push(content);
        if (repeatCount[key].length >= 5) {
            message.guild.members.ban(message.author, { reason: 'Spamming' })
                .catch(console.error);
            repeatCount[key] = [];
        }
    } else {
        repeatCount[key] = [content];
    }

    lastMessage[key] = now;
});

client.login(process.env.TOKEN);
