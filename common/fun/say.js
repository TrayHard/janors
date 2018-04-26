/**
 * Created by Илья on 08.03.2016.
 */
'use strict'

var allowedUser = "154325300346355713";

var Config = require('../../config.json');


if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");
function Say(bot, msg, suffix) {
    if(msg.author.id != allowedUser) {
        msg.channel.send("<@"+msg.author.id+">, Вы не Трэй, вам нельзя!")
        return;
    }
    var query = suffix;
    if (!query) {
        msg.channel.send("Используй: **`"+prefix+"скажи`** `пример`");
        if(msg.channel!=msg.author.dmChannel) msg.delete();
        return;
    }
    msg.channel.send(query);
    if(msg.channel!=msg.author.dmChannel) msg.delete();
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Say;