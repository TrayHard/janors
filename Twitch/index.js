var request = require('request');
var Config = require("../config.json");
var userID = "114077213"; // trayhardplay UserID 114077213 
var serverID = "154328532875608075";
var roleName = "Зрители"

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
        console.log("Request has been sent");
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          if(!state.isStreamOnline){  // Если стрим был оффлайн
                if(info.stream != null) {  // А стал онлайн
                    // То пишем об этом сообщение
                    bot.channels.find("name","news_streams").send("<@&"+roleID+">", {  
                        embed: {
                            title: "",
                            description: "",
                            color: 1255
                            ,fields:[
                                {
                                    name: "**"+info.stream.game+"**",
                                    value: "```"+info.stream.channel.status+"```\nhttps://www.twitch.tv/trayhardplay\n",
                                    inline: false
                                }
                            ]
                            ,image: {
                                url: info.stream.preview.large
                            }
                            ,author: {
                                name: "TrayHardPlay: поток подрублен!",
                                url: "https://www.twitch.tv/trayhardplay",
                                icon_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/d10964ed-068b-4981-9b48-3466fbe6263e-profile_image-300x300.png"
                            }
                            ,provider:{
                                name: "TRAY",
                                url: "https://www.twitch.tv/trayhardplay"
                            }
                            // ,footer: {
                            //     text: "https://www.twitch.tv/trayhardplay",
                            //     icon_url: "https://cdn.discordapp.com/avatars/154325300346355713/7da7e4fe880cfca1c907878e3d97de44.png",
                            // }
                        }
                    });
                    // И ставим, что стрим теперь онлайн
                    state.isStreamOnline = true;
                }
          } else {              // Если стрим был онлайн
            if(info.stream == null) {  // А стал оффлайн
                // Ставим что он теперь оффлайн
                state.isStreamOnline = false;
            }
          }
        } else if (error) {
            console.log(error);
        }
    });
    //return isStreamOnline;
}

module.exports.CheckStreamState = CheckStreamState;