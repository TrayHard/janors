var request = require('request');
var Config = require("../config.json");
var userID = "114077213"; // trayhardplay UserID 114077213 

function CheckStreamState(bot, state) {
    var options = {
        url: 'https://api.twitch.tv/kraken/streams/'+userID,
        headers: {
          'Client-ID': Config.clientID,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      };
    request(options, (error, response, body)=> {

        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          if(!state.isStreamOnline){  // Если стрим был оффлайн
                if(info.stream != null) {  // А стал онлайн
                    // То пишем об этом сообщение
                    bot.channels.find("name","tests").send(info.stream.channel.display_name+" запустил стрим!\n"+
                        "Игра: "+info.stream.game+"\n"+
                        "Заголовок: "+info.stream.channel.status+"\n", {
                            files: [info.stream.preview.large]
                    })
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