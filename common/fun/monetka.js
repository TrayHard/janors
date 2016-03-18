/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Monetka (bot, msg) {
    var number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
        bot.sendFile(msg.channel, "./images/orel.png");
    } else {
        bot.sendFile(msg.channel, "./images/reshka.png");
    }
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Monetka;