const Discord = require("discord.js"); // npm i discord.js
const superagent = require("superagent"); // npm i superagent (if not use npm i superagent.js then npm i superagent)
exports.run = async (bot, message, args) => {
    const { body } = await superagent
        .get(`https://nekos.life/api/v2/img/Random_hentai_gif`); // change boobs to what you want  https://github.com/Nekos-life/nekos-dot-life - here is the link to see all available features
    let embed = new Discord.MessageEmbed()
        .setImage(body.url)
        .setColor("RANDOM")
    message.channel.send(embed)
    
};
module.exports.help = {
    name: "hentai", 
    aliases: ["пошлятина"]
};