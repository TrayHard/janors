var request = require('request');
var Config = require("../config.json");
var userID = "114077213"; // trayhardplay UserID 114077213 
var serverID = "154328532875608075";
var roleName = "Зрители";
var gameRoles = {
    "Creative": "<@&435391284081852417>",
    "PLAYERUNKNOWN\'S BATTLEGROUNDS": "<@&435403107875160067>",
    "Counter-Strike: Global Offensive": "<@&435404401742446595>",
    "Dota 2": "<@&224237115381121025>",
    "Star Wars: Jedi Knight - Jedi Academy": "<@&154872872769290240>"
} 
var channelName = "news_streams";

function CheckStreamState(bot, state) {
    var roleID = bot.guilds.find("id", serverID).roles.find("name", roleName).id
    var options = {
        url: 'https://api.twitch.tv/kraken/streams/'+userID,
        headers: {
          'Client-ID': Config.clientID,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
    };
    request(options, (error, response, body)=> {
        //console.log("Request has been sent");
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          if(!state.isStreamOnline){  // Если стрим был оффлайн
                if(info.stream != null) {  // А стал онлайн
                    // То пишем об этом сообщение
                    bot.channels.find("name",channelName).send(`<@&${roleID}> ${gameRoles[info.stream.game]}`, {  //
                        embed: {
                            title: "",
                            description: "",
                            color: 1255,
                            fields:[
                                {
                                    name: "**"+info.stream.game+"**",
                                    value: "```"+info.stream.channel.status+"```\nhttps://www.twitch.tv/trayhardplay\n",
                                    inline: false
                                }
                            ],
                            image: {
                                url: info.stream.preview.large+`?${Date.now()}`
                            },
                            author: {
                                name: "TrayHardPlay: поток подрублен!",
                                url: "https://www.twitch.tv/trayhardplay",
                                icon_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/d10964ed-068b-4981-9b48-3466fbe6263e-profile_image-300x300.png"
                            },
                            provider:{
                                name: "TRAY",
                                url: "https://www.twitch.tv/trayhardplay"
                            }
                        }
                    });
                    // И обновляем state
                    state.isStreamOnline = true;
                    state.gameName = info.stream.game;
                    state.title = info.stream.channel.status;
                }
          } else {              // Если стрим был онлайн
            if(info.stream == null) {  // А стал оффлайн
                // Ставим что он теперь оффлайн
                state.isStreamOnline = false;
            } else {
                if(state.gameName != info.stream.game || state.title != info.stream.channel.status){
                    bot.channels.find("name", channelName).send("<@&"+roleID+">", {  //
                        embed: {
                            title: "",
                            description: "",
                            color: 1255,
                            fields:[
                                {
                                    name: "**"+info.stream.game+"**",
                                    value: "```"+info.stream.channel.status+"```\nhttps://www.twitch.tv/trayhardplay\n",
                                    inline: false
                                }
                            ],
                            image: {
                                url: info.stream.preview.large+`?${Date.now()}`
                            },
                            author: {
                                name: "TrayHardPlay: сменил игру!",
                                url: "https://www.twitch.tv/trayhardplay",
                                icon_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/d10964ed-068b-4981-9b48-3466fbe6263e-profile_image-300x300.png"
                            },
                            provider:{
                                name: "TRAY",
                                url: "https://www.twitch.tv/trayhardplay"
                            }
                        }
                    });
                    // И обновляем state
                    state.gameName = info.stream.game;
                    state.title = info.stream.channel.status;
                }
            }
          }
        } else if (error) {
            console.log(error);
        }
    });
    //return isStreamOnline;
}

module.exports.CheckStreamState = CheckStreamState;