/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function ServInfo(bot, msg) {
    /*
     var serverName = msg.channel.server.name;
     var serverRegion = msg.channel.server.region;
     var serverOwner = msg.channel.server.owner.username;
     var iconURL = msg.channel.server.iconURL;
     */
    var serverID = msg.channel.server.id;
    var channels = msg.channel.server.channels.length;
    var defaultChannel = msg.channel.server.defaultChannel.name;
    var members = msg.channel.server.members.length;

    var serverinfo = ("```Это наш уютный замечательный сервер для игроков в Jedi Academy. \n" +
    "ID Сервера: " + serverID + "\nРасположен в Германии\nВладелец, конечно же, Tray!" +
    "\nГруппа ВК: http://vk.com/rujka" + "\nНаш YouTube: http://www.youtube.com/extrajka" +
    "\nTwitch: http://twitch.tv/rujka1\n```");
    bot.sendMessage(msg, serverinfo);
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = ServInfo;