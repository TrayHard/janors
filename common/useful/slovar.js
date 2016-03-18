/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
var Config = require('../../config.json');
if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");

function Slovar(bot, msg, suffix) {
    var query = suffix;
    if (!query) {
        bot.sendMessage(msg.channel, "Используй: **`"+prefix+"словарь`** `искомый термин`");
        return;
    }
    var Urban = require('urban');
    Urban(suffix).first(function(json) {
        if (json !== undefined) {
            var definition = "" + json.word + ": " + json.definition +
                "\n:arrow_up: " + json.thumbs_up + "   :arrow_down: " + json.thumbs_down +
                "\n\nExample: " + json.example;
            bot.sendMessage(msg.channel, definition);
        } else {
            bot.sendMessage(msg.channel, "Я не могу найти: " + suffix);
        }
    });
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Slovar;