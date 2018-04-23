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
        msg.channel.sendMessage("Используй: **`"+prefix+"скажи`** `пример`");
        return;
    }
    var G = require('gizoogle');
    G.string(suffix, function(error, translation) {
        msg.channel.sendMessage(translation);
    });
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Say;