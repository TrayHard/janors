'use strict'
var Discord = require("discord.js");
var Config = require("./config.json");


var multiline = require("multiline");
var qs = require("querystring");

var bot = new Discord.Client();
var lastCmdTimestamp;

bot.on("ready", function() {
	console.log("Started successfully. Serving in " + bot.guilds.array().length + " servers");
});

bot.on("disconnected", function() {
	console.log(currentTime() + "Disconnected. Attempting to reconnect...");
	sleep(5000);
	bot.login(Config.token);
});

function print(msg){
	console.log(msg);
}
// bot.on("message", msg => {
// 	if (msg.content === 'ping') {
// 		msg.channel.sendMessage('pong');
// 	}
// });

bot.on("message", msg => {
	//Checks if the message is a command
	//   /^Jan[\s(.+)]/
	if (Config.prefix == '!') {
		if (msg.content[0] === Config.prefix) {
			var command = msg.content.toLowerCase().split(" ")[0].substring(1);
			var suffix = msg.content.toLowerCase().substring(command.length + 2);
			print("Message: \"" + msg.content + "\"");
			print("Command: " + command);
			print("Suffix: " + suffix);
			var cmd = commands[command];
			print(cmd)
			cmd(bot, msg, suffix);
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
				var args = msg.content.toLowerCase().split(" ");
				var command = args[1];
				var suffix = msg.content.toLowerCase().slice(name.length + command.length + 2);
				print("Message: \"" + msg.content + "\"");
				print("Command: " + command);
				print("Suffix: " + suffix);
				var cmd = commands[command];
				if (cmd) {
					print(cmd);
					cmd(bot, msg, suffix);
				} else Common.Info.Help(bot, msg, suffix);
			}
		}
	}
});

//
var Common = require('./common');
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
	"members": Common.Info.Members,
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
	"rofl": Common.Fun.Emotes.rofl,
	"kappa": Common.Fun.Emotes.kappa,
	"лягуха": Common.Fun.Emotes.feelsgood,
	"dcp": Common.Fun.Emotes.dcp,
	"карлик": Common.Fun.Emotes.karlik,
	"сложна": Common.Fun.Emotes.slojna,
	"пардон": Common.Fun.Emotes.pardon,
	"ехидство": Common.Fun.Emotes.ehidstvo,
	"il": Common.Fun.Emotes.illuminati,
	"rage": Common.Fun.Emotes.rage,
	"blowup": Common.Fun.Emotes.explosion,
	"хы": Common.Fun.Emotes.holms,
	"обидка": Common.Fun.Emotes.obidka,
	"флирт": Common.Fun.Emotes.flirt,
	"неуважение": Common.Fun.Emotes.disrespect,
	"оу": Common.Fun.Emotes.moriarti,
	"арр": Common.Fun.Emotes.arrr,
	"wtf": Common.Fun.Emotes.wtf,
	"traygasm": Common.Fun.Emotes.traygasm,
	"fuckoff": Common.Fun.Emotes.fuckoff,
	"мдаа": Common.Fun.Emotes.mdaa,
	"свали": Common.Fun.Emotes.svali,
	"свалинахуй": Common.Fun.Emotes.svali,
	"спать": Common.Fun.Emotes.spat,
	"подмигни": Common.Fun.Emotes.flirt,
	"ривз": Common.Fun.Emotes.podmigni,
	"чпок": Common.Fun.Emotes.chpok,
	"оргия": Common.Fun.Emotes.orgy,
	"найсшутка": Common.Fun.Emotes.niceJoke,
	"нахуй": Common.Fun.Emotes.nahui,
	"никого": Common.Fun.Emotes.nikogo,
	"деточка": Common.Fun.Emotes.detochka,
    /*=======================================================================================================*/
	/*===================================== ПОЛЕЗНОЕ ========================================================*/
	/*=======================================================================================================*/
	"youtube": Common.Useful.YouTube,
	"словарь": Common.Useful.Slovar,
	"вики": Common.Useful.Wikipedia,
	"mon": JKA.Info.Monitoring
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
