/**
 * Created by Илья on 21.03.2016.
 */
'use strict'
var Discord = require("discord.js");
var Config = require("../../config.json");
var request = require('request');
var fs = require('fs')


function Test(bot, msg, suffix) {
    // var managedRoles = [
    //     { "id": "435403107875160067", "name": "PUBG" },
    //     { "id": "436137472397803520", "name": "RUST" },
    //     { "id": "445497898285662228", "name": "Quake" },
    //     { "id": "445891358683693067", "name": "KF2" },
    //     { "id": "448423843548233738", "name": "LoL" },
    //     { "id": "440705931865620492", "name": "TTT" },
    //     { "id": "224237115381121025", "name": "Dota 2" },
    //     { "id": "435404401742446595", "name": "CSGO" },
    //     { "id": "154872872769290240", "name": "JKA" },
    //     { "id": "437980405136621588", "name": "Anime" },
    // ]
    


    // Запись
    
    // var str = JSON.stringify(managedRoles);
    // fs.writeFile("roles.json", str, function(){
    //     console.log("DONE!");
    // })

    // Чтение
    // fs.readFile("roles.json", (err,data)=>{
    //     if(err) { console.log(err.message); return;}
    //     var obj = JSON.parse(data);
    //     console.log(obj);
    //     msg.channel.send(obj);
    // })



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
    //             url: "https://static-cdn.jtvnw.net/jtv_user_pictures/d10964ed-068b-4981-9b48-3466fbe6263e-profile_image-300x300.png",
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