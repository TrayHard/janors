/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Avatar(bot, msg, suffix) {
    if (msg.mentions.length === 0) {
        if (msg.author.avatarURL === null) {
            msg.channel.sendMessage("Не обманывай меня, нет у тебя никакого аватара!");
        } else {
            msg.channel.sendMessage("Держи:\n" + msg.author.avatarURL);
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
    msg.channel.sendMessage(msgArray);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Avatar;