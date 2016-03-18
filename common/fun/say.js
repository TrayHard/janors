/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
var Config = require('../../config.json');
if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");
function Say(bot, msg, suffix) {
    var query = suffix;
    if (!query) {
        bot.sendMessage(msg.channel, "Используй: **`"+prefix+"скажи`** `пример`");
        return;
    }
    var G = require('gizoogle');
    G.string(suffix, function(error, translation) {
        bot.sendMessage(msg.channel, translation);
    });
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Say;