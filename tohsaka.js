const botconfig = require("dotenv").config().parsed;
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: false });
const client = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const activities_list = ["Hello everyone!"];
bot.on("ready", () => {
    bot.user.setStatus("available");
    setInterval(() => {
        const index = Math.floor(
            Math.random() * (activities_list.length - 1) + 1
        );
        bot.user.setActivity(activities_list[index], { type: "PLAYING" });
    }, 10000);
});
bot.on("ready", () => {
    console.log(`The bot ${bot.user.username} has been started`);
    bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
        console.log(link);
    });
});
fs.readdir("./cmds/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f) => {
        let props = require(`./cmds/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach((alias) => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});
bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    bot.send = function (msg) {
        message.channel.send(msg);
    };
    let args = message.content
        .slice(botconfig.PREFIX.length)
        .trim()
        .split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;
    bot.uId = message.author.id;
    if (bot.commands.has(cmd)) {
        commandfile = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        commandfile = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        commandfile.run(bot, message, args);
    } catch (e) {}
});
bot.on("message", (msg) => {
    if (msg.content === "!rins ass") {
        msg.reply(
            "https://img.rule34.xxx/images/2344/f197f9a3d017dbed87c0af24dd26d72f.jpeg?2555429"
        );
    }
});
bot.on("message", (msg) => {
    if (msg.content === "!pughelp") {
        msg.channel.send(
            'Чтобы собрать лобби введите команду !lobby ["1","2","2?","3","3?"] [ip:port] [password]'
        );
    }
});
bot.login(botconfig.TOKEN);
