/**
 * Created by Илья on 21.03.2016.
 */
'use strict'
var Config = require("../../config.json");
var request = require('request');

function Test(bot, msg, suffix) {
    console.log(bot.channels.first().send("qq suka"));
    
    
    
    // var userID = "63614185"//"114077213"; // trayhardplay UserID

    // var options = {
    //     url: 'https://api.twitch.tv/kraken/streams/23161357',
    //     headers: {
    //       'Client-ID': Config.clientID,
    //       'Accept': 'application/vnd.twitchtv.v5+json'
    //     }
    //   };
    // request(options, (error, response, body)=> {
    //     if (!error && response.statusCode == 200) {
    //       var info = JSON.parse(body);
    //       console.log("BODY:");
    //       console.log(info.stream.game);
    //       msg.channel.send(info.stream.channel.display_name+" запустил стрим!\n"+
    //       "Игра: "+info.stream.game+"\n"+
    //       "Заголовок: "+info.stream.channel.status+"\n", {
    //         files: [info.stream.preview.large]
    //       })
    //     } else if (error) {
    //         console.log(error);
    //     }
    // });



    //msg.author.send("```"+msg+"```");
    // msg.channel.send("", {
    //     embed: {
    //         title: "__**Информация о сервере**__",
    //         description: "**Треева Берлога** это сервачок \"для своих\" с валом локальных мемасов, "+
    //         "кучкой кодеров и гапшой геймеров.\n\nСюда не попадают случайно, здесь нет "+
    //         "тех, кого мы не знаем, все новички это чьи-то друзья и знакомые, "+
    //         "а также некоторые зрители со стримов Трея. \n\nСсылочка на него есть в разделе #info "+
    //         "или по команде !stream.",
    //         color: 1255
    //         ,fields:[
    //             {
    //                 name: "PUBG",
    //                 value: "Большой",
    //                 inline: true
    //             },
    //             {
    //                 name: "CSGO",
    //                 value: "Большой",
    //                 inline: true
    //             },
    //             {
    //                 name: "PUBG",
    //                 value: "Большой",
    //                 inline: true
    //             },
    //             {
    //                 name: "CSGO",
    //                 value: "Большой",
    //                 inline: true
    //             }
    //         ]
    //         ,thumbnail: {
    //             url: "https://cdn.discordapp.com/avatars/154325300346355713/7da7e4fe880cfca1c907878e3d97de44.png",
    //             height: 550,
    //             weight: 250
    //         }
    //         ,author: {
    //             name: "Tray",
    //             url: "https://vk.com/trayhardplay",
    //             icon_url: "https://cdn.discordapp.com/avatars/154325300346355713/7da7e4fe880cfca1c907878e3d97de44.png"
    //         }
    //         ,provider:{
    //             name: "TRAY",
    //             url: "https://vk.com/trayhardplay"
    //         }
    //         // ,footer: {
    //         //     text: "FOOTER",
    //         //     icon_url: "https://cdn.discordapp.com/avatars/154325300346355713/7da7e4fe880cfca1c907878e3d97de44.png",

    //         // }
    //     }
    // });
    //"<@"+msg.author.id+">:"
    //bot.sendMessage(msg.channel, " ");
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Test;