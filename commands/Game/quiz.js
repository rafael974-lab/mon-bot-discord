// quiz.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Initiates a quiz game.'),
    async execute(interaction) {
        const questions = [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "What is 2 + 2?", answer: "4" },
            { question: "What color do you get when you mix red and white?", answer: "Pink" }
        ];
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];

        await interaction.reply({ content: `Question: ${question.question}\nType your answer in the chat!`, ephemeral: true });
        // Here you could listen to the reply in another event like 'messageCreate' or use a collector to collect the answer.
    }
};