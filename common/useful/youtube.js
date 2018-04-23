/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
var Config = require('../../config.json');
if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");

function YouTube(bot, msg, suffix) {
    var query = suffix;
    if (!query) {
        msg.channel.sendMessage("Используй: **`"+prefix+"youtube`** `категория или название видео`");
        return;
    }
    var yt = require("./youtube_plugin");
    var youtube_plugin = new yt();
    youtube_plugin.respond(suffix, msg.channel, bot);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = YouTube;