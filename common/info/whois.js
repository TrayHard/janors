/**
 * Created by Tray on 08.03.2016.
 */
'use strict'
function WhoIs(bot, msg, suffix) {
    if (msg.mentions.length == 0) {
        var username = msg.author.username;
        var userID = msg.author.id;
        var discriminator = msg.author.discriminator;
        var status = msg.author.status;
        var avatar = msg.author.avatarURL;
        var userinfo = ("```Имя: " + username + "\nID: " + userID + "\nДискриминатор: " + discriminator + "\nСтатус: " + status + "\nАватар: " + avatar + "```");
        msg.channel.sendMessage(userinfo);
    } else {
        for (var user of msg.mentions)
            if (user != null) {
                let info = [];
                var username = user.username;
                var userID = user.id;
                var discriminator = user.discriminator;
                var status = user.status;
                var avatar = user.avatarURL;
                var userinfo = ("```Имя: " + username + "\nID: " + userID + "\nДискриминатор: " + discriminator + "\nСтатус: " + status + "\nАватар: " + avatar + "```");
                msg.channel.sendMessage(userinfo);
            }
    }
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = WhoIs;