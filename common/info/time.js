/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Time(bot, msg) {
    var uptimeh = Math.floor((bot.uptime / 1000) / (60 * 60));
    var uptimem = Math.floor((bot.uptime / 1000) % (60 * 60) / 60);
    var uptimes = Math.floor((bot.uptime / 1000) % 60);
    msg.channel.sendMessage("Эта сессия длится:\n" + uptimeh + " Часов\n" + uptimem + " Минут'ы\n" + uptimes + " Секунд'ы\n");
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Time;