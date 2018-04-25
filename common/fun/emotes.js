/**
 * Created by Илья on 16.03.2016.
 */
'use strict'

var Config = require("../../config.json");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function emotes(bot, msg, suffix) {
    console.log("suffix: " + suffix)
    if(suffix != "" && suffix !== undefined)
    {
        msg.reply("Неверный ввод! \nВведите `!emotes` чтобы просмотреть список доступных эмоций!")
        return;
    } 
    var emote = msg.content.substring(1);
    if(emote=="emotes") {
        msg.author.send("__**ЭМОЦИИ:**__")
        for (var emo in EmotesDirect){
            await sleep(2000);
            msg.author.send(Config.prefix+emo+":");
            eval(EmotesDirect[emo]);
        }
        return;
    } else if (Emotes[emote]===undefined) {
        msg.channel.send("Такой эмоции нет! ")
        if(msg.channel!=msg.author.dmChannel) msg.delete();
    }
    msg.channel.send("<@"+msg.author.id+">: ");
    var emote = msg.content.substring(1);
    eval(Emotes[emote]);
    if(msg.channel!=msg.author.dmChannel) msg.delete();
}


var EmotesDirect = {
    "rofl": "msg.author.send({files:[{attachment: 'images/rofl.png',name: 'rofl.png'}]}).catch(console.error);",
    "kappa": "msg.author.send({files:[{attachment: 'images/Kappa.png',name: 'Kappa.png'}]}).catch(console.error);",
    "feelsgood": "msg.author.send({files:[{attachment: 'images/Feelsgoodman.png',name: 'Feelsgoodman.png'}]}).catch(console.error);",
    "dcp": "msg.author.send({files:[{attachment: 'images/dcp.png',name: 'dcp.png'}]}).catch(console.error);",
    "karlik": "msg.author.send({files:[{attachment: 'images/karlik.png',name: 'karlik.png'}]}).catch(console.error);",
    "wasted": "msg.author.send({files:[{attachment: 'images/wasted.png',name: 'wasted.png'}]}).catch(console.error);",
    "slojna": "msg.author.send(\"http://www.youtube.com/watch?v=9HNi47ameLI\");",
    "wtf": "msg.author.send(\"https://giphy.com/gifs/lrpC7EPBderkY\");",
    "traygasm": "msg.author.send(\"https://giphy.com/gifs/booty-had-me-like-xB1RqLGoBNh3W\");",
    "fuckoff": "msg.author.send(\"https://giphy.com/gifs/drinking-shirtless-fuck-off-uVUoBe9nzS2Wc\");",
    "spat": "msg.author.send(\"https://giphy.com/gifs/AZ9E5rrNWsacg\");",
    "jadnost": "msg.author.send(\"https://youtu.be/6PwHFIhQ8Zo\");"
}
var Emotes = {
    "rofl": "msg.channel.send({files:[{attachment: 'images/rofl.png',name: 'rofl.png'}]}).catch(console.error);",
    "kappa": "msg.channel.send({files:[{attachment: 'images/Kappa.png',name: 'Kappa.png'}]}).catch(console.error);",
    "feelsgood": "msg.channel.send({files:[{attachment: 'images/Feelsgoodman.png',name: 'Feelsgoodman.png'}]}).catch(console.error);",
    "dcp": "msg.channel.send({files:[{attachment: 'images/dcp.png',name: 'dcp.png'}]}).catch(console.error);",
    "karlik": "msg.channel.send({files:[{attachment: 'images/karlik.png',name: 'karlik.png'}]}).catch(console.error);",
    "wasted": "msg.channel.send({files:[{attachment: 'images/wasted.png',name: 'wasted.png'}]}).catch(console.error);",
    "slojna": "msg.channel.send(\"http://www.youtube.com/watch?v=9HNi47ameLI\");",
    "wtf": "msg.channel.send(\"https://giphy.com/gifs/lrpC7EPBderkY\");",
    "traygasm": "msg.channel.send(\"https://giphy.com/gifs/booty-had-me-like-xB1RqLGoBNh3W\");",
    "fuckoff": "msg.channel.send(\"https://giphy.com/gifs/drinking-shirtless-fuck-off-uVUoBe9nzS2Wc\");",
    "spat": "msg.channel.send(\"https://giphy.com/gifs/AZ9E5rrNWsacg\");",
    "jadnost": "msg.channel.send(\"https://youtu.be/6PwHFIhQ8Zo\");"
}
/*===============================================================================*/
module.exports = emotes;