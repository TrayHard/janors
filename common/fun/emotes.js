00/**
 * Created by Илья on 16.03.2016.
 */
'use strict'

function emotes(bot, msg, suffix) {
        console.log("suffix: " + suffix)
    if(suffix!="")
    {
        msg.reply("Неверный ввод! \nВведите `!emotes` чтобы просмотреть список доступных эмоций!")
        return;
    }
    msg.channel.sendMessage("<@"+msg.author.id+">: ");
    var emote = msg.content.substring(1);
    eval(Emotes[emote]);
    msg.delete();
}

var Emotes = {
        "rofl": "msg.channel.sendFile(\"./images/rofl.png\");",
        "kappa": "msg.channel.sendFile( \"./images/Kappa.png\");",
        "feelsgood": "msg.channel.sendFile( \"./images/Feelsgoodman.png\");",
        "dcp": "msg.channel.sendFile( \"./images/dcp.png\");",
        "karlik": "msg.channel.sendFile( \"./images/karlik.png\");",
        "slojna": "msg.channel.sendMessage(author.username+\": http://www.youtube.com/watch?v=9HNi47ameLI\");",
        "wtf": "msg.channel.sendMessage(author.username+\": https://giphy.com/gifs/lrpC7EPBderkY\");",
        "traygasm": "msg.channel.sendMessage(author.username+\": https://giphy.com/gifs/booty-had-me-like-xB1RqLGoBNh3W\");",
        "fuckoff": "msg.channel.sendMessage(author.username+\": https://giphy.com/gifs/drinking-shirtless-fuck-off-uVUoBe9nzS2Wc\");",
        "svali": "msg.channel.sendMessage(author.username+\": https://giphy.com/gifs/leave-seinfeld-go-away-q6dbqenBKNrgY\");",
        "spat": "msg.channel.sendMessage(author.username+\": https://giphy.com/gifs/AZ9E5rrNWsacg\");",
        "detochka": "msg.channel.sendMessage(author.username+\": https://youtu.be/6PwHFIhQ8Zo\");"
}

/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = emotes;