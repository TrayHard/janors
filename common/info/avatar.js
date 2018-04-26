/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Avatar(bot, msg, suffix) {
    if (msg.mentions.users.array().length === 0) 
    {
        if (msg.author.avatarURL === null) {
            msg.channel.send("Не обманывай меня, нет у тебя никакого аватара!");
        } else {
            msg.channel.send("Держи:\n" + msg.author.avatarURL);
        }
        return;
    }
    var msgArray = [];
    for (var user of msg.mentions.users.values()) {
        if (user.avatarURL === null) {
            msgArray.push(user.username + " без аватара (как loh).");
        } else {
            msgArray.push("Аватар "+ user.username + ":\n" + user.avatarURL);
        }
    }
    msg.author.send(msgArray);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Avatar;