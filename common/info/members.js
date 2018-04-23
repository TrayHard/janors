/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Members(bot, msg) {
    var serversList = "";
    for (var server of bot.servers.sort()) {
        let online = 0;
        let member = "";
        serversList += "**` Количество участников: " + server.members.length + " (";
        online = server.members.reduce((count, member) => count + (member.status === 'online' ? 1 : 0), 0);
        serversList += online + " в сети)\n`**";
    }
    msg.channel.sendMessage(serversList);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Members;