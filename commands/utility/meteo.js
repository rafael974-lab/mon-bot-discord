// meteo.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Obtain weather information for a specified location.')
        .addStringOption(option => option.setName('location').setDescription('Location to get the weather for').setRequired(true)),
    async execute(interaction) {
        const location = interaction.options.getString('location');
        const apiKey = process.env.WEATHER_API_KEY; // Assure-toi que cette clé est définie dans ton fichier .env
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        try {
            const response = await axios.get(url);
            const weather = response.data;
            interaction.reply({ content: `Weather in ${location}: ${weather.current.condition.text}, Temp: ${weather.current.temp_c}°C, Humidity: ${weather.current.humidity}%`, ephemeral: true });
        } catch (error) {
            interaction.reply({ content: `Error fetching weather data: ${error.message}`, ephemeral: true });
        }
    }
};
