'use strict'
var Discord = require("discord.js");
var Config = require("./config.json");

var multiline = require("multiline");
var qs = require("querystring");
var fs = require("fs");

var bot = new Discord.Client();
var lastCmdTimestamp;

var isDebug = false;
// Суперкостыль, чтобы сохранять значение переменной
var state = {
	// Онлайн ли отслеживаемый стрим
	isStreamOnline: false,
	gameName: "",
	title: ""
}
// Доступные роли для менеджера ролей
var managedRoles = [];

const streamRequestTimer = 30;

bot.on("ready", function() {
	console.log("Started successfully. Serving in " + bot.guilds.array().length + " servers");
	// Читаем список доступных для менеджера ролей
	fs.readFile("roles.json", (err, data)=>{
	    if(err) { console.log("RoleReadError: " + err.message); return;}
		managedRoles = JSON.parse(data);
		Common.Useful.RefreshRoles(bot, managedRoles);
	    console.log("Roles have been read succesfully!");
	})
	setInterval(() => { return Twitch.CheckStreamState(bot,state) }, streamRequestTimer * 1000)
});

function print(msg)
{
	console.log(msg);
}

bot.on("message", msg => {
	if(msg.author.bot) return;
	//Checks if the message is a command
	//   /^Jan[\s(.+)]/
	if (Config.prefix == '!') {
		if (msg.content[0] === Config.prefix) {
			var command = msg.content.split(" ")[0].substring(1);
			var suffix = msg.content.substring(command.length + 2).trim();
			if(isDebug)
			{
				print("Message: \"" + msg.content + "\"");
				print("Command: " + command);
				print("Suffix: " + suffix);
			}
			var cmd = commands[command];
			if(isDebug)
			{
				print(cmd);
			}
			if(cmd === undefined)
			{
				print("Wrong cmd: "+command)
				msg.channel.send("Такой команды нет! Используйте `"+Config.prefix+"help`!")
				return;
			}
			if(command == "roles"){
				cmd(bot, msg, suffix, managedRoles);
			} else {
				cmd(bot, msg, suffix, Config.prefix);
			}
			if( ( (Date.now() - lastCmdTimestamp) / 1000 ) > 5 ){
				lastCmdTimestamp = Date.now();
				print(lastCmdTimestamp)
			}
		}
	} else {
		var pattern = new RegExp("^" + Config.prefix + "[\\s(.+)]");
		var appeal = pattern.exec(msg.content);
		if (appeal) {
			var name = appeal[0].match(/\S+/)[0];
			if (name === Config.prefix) {
				var args = msg.content.split(" ");
				var command = args[1];
				var suffix = msg.content.slice(name.length + command.length + 2).trim();
				print("Message: \"" + msg.content + "\"");
				print("Command: " + command);
				print("Suffix: " + suffix);
				var cmd = commands[command];
				if (cmd) {
					print(cmd);
					if(command == "roles"){
						cmd(bot, msg, suffix, managedRoles);
					} else {
						cmd(bot, msg, suffix, Config.prefix);
					}
				} else Common.Info.Help(bot, msg, suffix, Config.prefix);
			}
		}
	}
});

var Common = require('./common');
var Twitch = require('./Twitch');
var JKA = require('./jka');
var commands = {
	/*=======================================================================================================*/
	/*======================================= INFO ==========================================================*/
	/*=======================================================================================================*/
	"te": Common.Info.Test,
	/* =============================== HELP =============================== */
	"команды": Common.Info.Help,
	"помощь": Common.Info.Help,
	"help": Common.Info.Help,
	"хелп": Common.Info.Help,
	///////////////////////////
	"whois": Common.Info.WhoIs,
	"аватар": Common.Info.Avatar,
	"serverinfo": Common.Info.ServInfo,
	//"members": Common.Info.Members,
	"время": Common.Info.Time,
	/*=======================================================================================================*/
	/*====================================== ЗАБАВЫ =========================================================*/
	/*=======================================================================================================*/
	"шар": Common.Fun.Shar,
	"скажи": Common.Fun.Say,
	"монетка":  Common.Fun.Monetka,
	"выбери": Common.Fun.Choice,
	"цитата": Common.Fun.Quotes,
	"кости": Common.Fun.Kosti,
	"мем": Common.Fun.Meme.MemeCreate,
	"мемы": Common.Fun.Meme.MemeHelp,
	"гифка":  Common.Fun.Gifka,
	/*====================================== ЭМОЦИИ =========================================================*/
	// "rofl": Common.Fun.Emotes,
	// "kappa": Common.Fun.Emotes,
	// "feelsgood": Common.Fun.Emotes,
	// "dcp": Common.Fun.Emotes,
	// "karlik": Common.Fun.Emotes,
	// "slojna": Common.Fun.Emotes,
	// "wtf": Common.Fun.Emotes,
	// "traygasm": Common.Fun.Emotes,
	// "fuckoff": Common.Fun.Emotes,
	// "wasted": Common.Fun.Emotes,
	// "spat": Common.Fun.Emotes,
	// "jadnost": Common.Fun.Emotes,
	// "emotes": Common.Fun.Emotes,
    /*=======================================================================================================*/
	/*===================================== ПОЛЕЗНОЕ ========================================================*/
	/*=======================================================================================================*/
	"youtube": Common.Useful.YouTube,
	"словарь": Common.Useful.Slovar,
	"вики": Common.Useful.Wikipedia,
	"mon": JKA.Info.Monitoring,
	"res": Common.Useful.Restart,
	"roles": Common.Useful.ManageRoles,
	/*=======================================================================================================*/
	/*====================================== ЗАБАВЫ =========================================================*/
	/*=======================================================================================================*/
	/*"драма": {
		process: function(bot, msg) {
			var rand = Math.floor(Math.random() * Drama.length);
			bot.sendMessage(msg.channel, Drama[rand]);
		}
	},*/
	/*=======================================================================================================*/
	/*======================================= ИГРЫ ==========================================================*/
	/*=======================================================================================================*/
	// В РАЗРАБОТКЕ
};

bot.login(Config.token);
