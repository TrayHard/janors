const botconfig = require("dotenv").config().parsed
const { lobbyValidation } = require('../../../lib/utils/validators');
const DEV = botconfig.DEV;

const Lobby = require('../models/Lobby');
const Command = require('../../../lib/types/Command');

// Всё время в секундах
const EMOJI = "✅";
const ROLEID_FOR_MENTION = "528086822232915990";

// Опции класса Lobby
const options = {
    LOBBY_LIFE_TIME: DEV ? 30 : 900,
    TIME_LIMIT_FOR_PRECOLLECT: DEV ? 20 : 60,
    TIME_BETWEEN_CD_UPDATES: DEV ? 5 : 5,
    COLOR_LOBBY_CREATED: "#c0c0c0",
    COLOR_LOBBY_PRECOLLECTED: "#e9ec5e",
    COLOR_LOBBY_COLLECTED: "#2ecc71",
    COLOR_LOBBY_FAILED: "#ff8080",
    MIN_PLAYERS_REQUIRED: DEV ? 1 : 4,
    MAX_PLAYERS_REQUIRED: 6,
}

const PugmakerCmd = new Command({
    name: "Lobby",
    desc: "Make lobby for gathering players for pug",
    triggers: ['pug', 'lobby', 'лобби', 'пуг'],
    run: async (bot, userMsg, args) => {
        // !lobby [players num] [rujka.ru:29080] [password]
        let [size, server, pw] = args;
        if (args.length && !validateInput(userMsg, args)) return

        let lobby = new Lobby({ author: userMsg.author, size, server, pw }, options)

        if (!DEV) await userMsg.channel.send(`<@&${ROLEID_FOR_MENTION}>`)
        userMsg.channel.send(lobby.embed).then((botMsg) => {
            botMsg.react(EMOJI);
            // Отлавливаем ✅
            const collectorOfUsers = botMsg.createReactionCollector(
                (reaction) => reaction.emoji.name == EMOJI,
                {
                    // maxUsers: 2,
                    maxUsers: lobby.size === "2"  ? options.MIN_PLAYERS_REQUIRED : options.MAX_PLAYERS_REQUIRED,
                    dispose: true
                }
            );
            // Когда прислали ✅
            collectorOfUsers.on("collect", (reaction, userToAdd) => lobby.addPlayer(userToAdd));
            // Когда сняли ✅
            collectorOfUsers.on("remove", (reaction, userToRemove) => lobby.removePlayer(userToRemove))
            // Когда собраны все ✅
            collectorOfUsers.on("end", (collection, reason) => lobby.finish(reason));
            // Отлавливаем лишние эмодзи и удаляем
            const collectorToRemove = botMsg.createReactionCollector((reaction) => reaction.emoji.name != EMOJI);
            collectorToRemove.on("collect", (reaction) => reaction.remove());
            // Заносим коллекторы и сообщение в лобби
            lobby.addCollector(collectorOfUsers)
            lobby.addCollector(collectorToRemove)
            lobby.addMessage(botMsg)
        });
        userMsg.delete();
    }
})

module.exports = PugmakerCmd