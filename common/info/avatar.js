/**
 * Created by Илья on 08.03.2016.
 */
'use strict'

var allowedUser = "154325300346355713";

function Avatar(bot, msg, suffix) {
    if(msg.author.id != allowedUser) {
        msg.channel.send("<@"+msg.author.id+">, Вы не Трэй, вам нельзя!")
        return;
    }
    if (msg.mentions.users.array().length === 0) 
    {
        if (msg.author.avatarURL === null) {
            msg.channel.send("Не обманывай меня, нет у тебя никакого аватара!");
        } else {
            msg.channel.send("Держи:\n" + msg.author.avatarURL);
        }
        if(msg.channel!=msg.author.dmChannel) msg.delete();
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
    if(msg.channel!=msg.author.dmChannel) msg.delete();
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Avatar;