const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    const embed = new Discord.MessageEmbed()
    .setColor("#fd0000")
    .setTitle(`Avatar ${target.username}`)
    .setImage(target.displayAvatarURL())
    message.channel.send(embed)
  }
  module.exports.help = {
      name: "avatar",
      aliases: ['ава']
  }