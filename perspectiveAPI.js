// perspectiveAPI.js
require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.PERSPECTIVE_API_KEY;
const url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';

/**
 * Analyze the toxicity of a given comment using the Perspective API.
 * @param {string} comment - The comment text to analyze.
 * @returns {Promise<Object>} - The API response containing the analysis results.
 */
async function analyzeComment(comment) {
  const params = {
    key: apiKey,
    resource: {
      comment: { text: comment },
      requestedAttributes: { TOXICITY: {} },
      languages: ["en"]  // Change this to match the language of your input, or remove it to default to English
    }
  };

  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (error) {
    console.error('Error calling the Perspective API:', error);
    throw error;  // Rethrowing the error is important if you want to handle it later in your bot's main code
  }
}

module.exports = analyzeComment;
