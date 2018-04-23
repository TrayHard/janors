/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
var Config = require('../../config.json');
if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");

function Wikipedia(bot, msg, suffix) {
    var query = suffix;
    if (!query) {
        msg.channel.sendMessage("Используй: **`"+prefix+"вики`** `что-то о чем хочешь увидеть информацию`");
        return;
    }
    var Wiki = require('wikijs');
    new Wiki().search(query, 1).then(function(data) {
        new Wiki().page(data.results[0]).then(function(page) {
            page.summary().then(function(summary) {
                var sumText = summary.toString().split('\n');
                var continuation = function() {
                    var paragraph = sumText.shift();
                    if (paragraph) {
                        msg.channel.sendMessage(paragraph, continuation);
                    }
                };
                continuation();
            });
        });
    });
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Wikipedia;