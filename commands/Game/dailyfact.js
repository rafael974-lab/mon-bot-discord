// dailyfact.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyfact')
        .setDescription('Provides a daily fact.'),
    async execute(interaction) {
        const facts = [
            "The heart of a shrimp is located in its head.",
            "A snail can sleep for three years.",
            "The fingerprints of a koala are so indistinguishable from humans that they have on occasion been confused at a crime scene."
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        await interaction.reply({ content: fact, ephemeral: true });
    }
};