const botconfig = require("dotenv").config().parsed
const Discord = require("discord.js");
const validator = require("validator");
const moment = require('moment');

const DEV = botconfig.DEV;

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
// Всё время в секундах
const EMOJI = "✅";
const ROLEID_FOR_MENTION = "528086822232915990";

class Lobby {
    constructor(args, options) {
        this.options = {...options};
        this.author = args.author;
        this.size = args.size ? args.size : "any";
        this.server = args.server ? { ip: args.server.split(":")[0], port: args.server.split(":")[1], pw: args.pw } : null;
        this.players = [ this.author ];
        this.collectors = []
        this.embed = this.baseEmbed.setFooter(
            `Через ${this.options.LOBBY_LIFE_TIME} секунд лобби закроется автоматически.`
        );
        this.timeCreated = moment()
        this.timePrecollected = null
        this.updateInterval = setInterval(() => {
            this.updateEmbed()
            if (this.timeLeft <= 0) this.collectors.forEach(collector => collector.stop(this.isPrecollected))
        }, this.options.TIME_BETWEEN_CD_UPDATES * 1000);
    }

    addCollector(collector) {
        this.collectors.push(collector)
    }

    addMessage(msg) {
        this.msg = msg;
    }

    get baseEmbed () {
        return new Discord.MessageEmbed()
            .setColor(this.options.COLOR_LOBBY_CREATED)
            .setAuthor(`${this.author.username} зовёт на pug!`, this.author.displayAvatarURL())
            .setThumbnail(
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/69545619487241.562db40012795.gif"
            )
            .setDescription(
                `⏳ Поиск игроков`
            )
            .addField(
                "**Сервер:**",
                this.printServer,
                true
            )
            .addField(
                `**Список игроков (${this.players.length}/${this.options.MAX_PLAYERS_REQUIRED}):**`,
                `${this.players.length > 0 ? "**"+this.players.join("\n")+"**" : "-"}`
            )
            .setTimestamp();
    }

    get isPrecollected() {
        return this.size == "any" && this.players.length >= this.options.MIN_PLAYERS_REQUIRED
    }

    get printServer() {
        if (this.server)
            return `/connect ${this.server.port == "29070" ? this.server.ip : this.server.ip+':'+this.server.port }${this.server.pw ? ';password '+this.server.pw : ''}`
        else
            return `Любой сервер`
    }

    get timeLeft() {
        if (this.isPrecollected) {
            return Math.max(0, this.options.TIME_LIMIT_FOR_PRECOLLECT - (moment().unix() - this.timePrecollected.unix()))
        } else {
            return Math.max(0, this.options.LOBBY_LIFE_TIME - (moment().unix() - this.timeCreated.unix()))
        }
    }

    updateEmbed() {
        if (this.isPrecollected) {
            this.embed = this.baseEmbed
                .setColor(this.options.COLOR_LOBBY_PRECOLLECTED)
                .setDescription(`⚠️ Игроков в лобби уже хватит для 2х2`)
                .setFooter(
                    `${this.timeLeft ? 'Через '+this.timeLeft+' секунд лобби закроется автоматически.' : 'Лобби закрывается...'}`
                );
        } else {
            this.embed = this.baseEmbed
                .setColor(this.options.COLOR_LOBBY_CREATED)
                .setDescription(
                    `⏳ Поиск игроков`
                )
                .setFooter(
                    `${this.timeLeft ? 'Через '+this.timeLeft+' секунд лобби закроется автоматически.' : 'Лобби закрывается...'}`
                );
        }
        this.msg.edit(this.embed);
    }

    addPlayer(playerToAdd) {
        if (playerToAdd.id === botconfig.BOT_ID) return;
        if (this.players.some((player) => player.id == playerToAdd.id)) return
        this.players.push(playerToAdd);
        if (this.isPrecollected && this.players.length == this.options.MIN_PLAYERS_REQUIRED)
            this.timePrecollected = moment()
        this.updateEmbed()
    }

    removePlayer(playerToRemove) {
        this.players = this.players.filter(player => player.id != playerToRemove.id)
        this.updateEmbed();
        if (this.timeLeft <= 0) this.collectors.forEach(collector => collector.stop(this.isPrecollected))
    }

    finish(succeed) {
        clearInterval(this.updateInterval)
        if (!succeed) {
            this.embed = new Discord.MessageEmbed()
                .setColor(this.options.COLOR_LOBBY_FAILED)
                .setAuthor(`${this.author.username} звал на pug, но никто не пришёл! 😢`, this.author.displayAvatarURL())
                .setTimestamp();
            this.msg.edit(this.embed)
            return
        } else {
            this.embed = new Discord.MessageEmbed()
                .setColor(this.options.COLOR_LOBBY_COLLECTED)
                .setAuthor(`${this.author.username} собрал pug`, this.author.displayAvatarURL())
                .setDescription(
                    `*${this.printServer}*\n\n` +
                    `${this.players.length} игроков собрано`
                )
                .addField("*Список игроков:*", this.players);
            this.msg.edit(this.embed);
            // Отправка в ЛС
            const embedForDM = new Discord.MessageEmbed()
                .setColor(this.options.COLOR_LOBBY_COLLECTED)
                .setAuthor(`${this.author.username} собрал pug`, this.author.displayAvatarURL())
                .setTitle("Сервер:")
                .setDescription(this.printServer);
            this.players.forEach((member) => member.send(embedForDM));
        }

    }
}

module.exports.run = async (bot, userMsg, args) => {
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
};
module.exports.help = {
    name: "lobby",
    aliases: ["pug","лобби","пуг"],
};

function validateInput (msg, args) {
    let helpString = "`"+botconfig.PREFIX+"pug [2/3/any] [ip:port] [pw]`"
    let [lobbySize, server, password] = args;
    if (!["2", "3", "any"].includes(lobbySize)) {
        msg.channel.send("Неверный ввод данных. Ошибка при вводе количества игроков!\n"+helpString);
        return false;
    }
    if (server) {
        let serverArr = server.split(":");
        if (
            serverArr.length != 2 ||
            !(
                validator.isIP(serverArr[0], 4) ||
                validator.isFQDN(serverArr[0])
            ) ||
            !validator.isPort(serverArr[1])
        ) {
            msg.channel.send("Неверный ввод данных. Ошибка ввода айпи сервера!\n"+helpString);
            return false;
        }
    }
    return true
}