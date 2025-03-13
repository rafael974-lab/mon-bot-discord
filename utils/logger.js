const fs = require('fs');
module.exports.log = (content) => {
  fs.appendFileSync('./logs/bot.log', `${new Date().toISOString()} : ${content}\n`);
};
