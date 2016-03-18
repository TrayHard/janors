/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Avatar(bot, msg, suffix) {
    if (msg.mentions.length === 0) {
        if (msg.author.avatarURL === null) {
            bot.sendMessage(msg.channel, "Не обманывай меня, нет у тебя никакого аватара!");
        } else {
            bot.sendMessage(msg.channel, "Держи:\n" + msg.author.avatarURL);
        }
        return;
    }
    var msgArray = [];
    for (var user of msg.mentions) {
        if (user.avatarURL === null) {
            msgArray.push(user.username + " без аватара как нищеброд.");
        } else {
            msgArray.push("Аватар "+ user.username + ":\n" + user.avatarURL);
        }
    }
    bot.sendMessage(msg.channel, msgArray);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Avatar;