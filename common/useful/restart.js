'use strict'
var Discord = require("discord.js");
var Config = require('../../config.json');

var multiline = require("multiline");
var qs = require("querystring");

if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");

function Restart(bot, msg) {
    bot.destroy()
    console.log(" Disconnected. Attempting to reconnect...");
	setTimeout(()=>{bot.login(Config.token)}, 1000)
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Restart;
