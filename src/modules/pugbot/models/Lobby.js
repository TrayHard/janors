const Discord = require("discord.js");
const moment = require('moment');
const botconfig = require("dotenv").config().parsed

module.exports = class Lobby {
    constructor(args, options) {
        this.options = {
            LOBBY_LIFE_TIME: options.LOBBY_LIFE_TIME, // Number
            TIME_LIMIT_FOR_PRECOLLECT: options.TIME_LIMIT_FOR_PRECOLLECT, // Number
            TIME_BETWEEN_CD_UPDATES: options.TIME_BETWEEN_CD_UPDATES, // Number
            COLOR_LOBBY_CREATED: options.COLOR_LOBBY_CREATED, // String
            COLOR_LOBBY_PRECOLLECTED: options.COLOR_LOBBY_PRECOLLECTED, // String
            COLOR_LOBBY_COLLECTED: options.COLOR_LOBBY_COLLECTED, // String
            COLOR_LOBBY_FAILED: options.COLOR_LOBBY_FAILED, // String
            MIN_PLAYERS_REQUIRED: options.MIN_PLAYERS_REQUIRED, // Number
            MAX_PLAYERS_REQUIRED: options.MAX_PLAYERS_REQUIRED // Number
        };
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