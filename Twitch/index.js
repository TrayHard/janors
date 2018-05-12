var TwitchApi = require('twitch-api');
var Config = require("../config.json");

function CheckStreamState(bot) {
    
    var chanName = "trayhardplay"
    var twitch = new TwitchApi({
        clientID: Config.clientID,
        clientSecret: Config.clientSecret,
        redirectUri: 'http://localhost'
    });

    twitch.getChannelStream(chanName,()=>{
        if(err!=null){
            console.log("TwiAPI Err:"+err)
        } else {
            //
        }
    })

}

module.exports.CheckStreamState = CheckStreamState;