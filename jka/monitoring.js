/**
 * Created by Илья on 17.03.2016.
 */
'use strict'
const columnify = require('columnify');
//const waterfall = require("async/waterfall");
var Stopwatch = require('timer-stopwatch');
const iconv = require('iconv-lite');
const dgram = require('dgram');

//const socket = dgram.createSocket('udp4');
const request = new Buffer ('\xff\xff\xff\xff\x02getstatus', 'ascii');

function MonitoringFunc (bot, msg, suffix) {
    this.socket = null;
    this.bot = bot;
    this.msg = msg;
    this.correct = true;
    if ((!suffix)||(suffix.toLowerCase() === "help")) {    //standard server
        var help = "Доступные варианты:\n" +
            "\n**\`!mon pb\`** - Russian Public Server" +
            "\n**\`!mon ds\`** - DarkSide Arena"+
            "\n**\`!mon wc\`** - Winter's Curse" +
            "\n**\`!mon loli\`** - Lolipop ESL" +
            "\n**\`!mon rjkc\`** - RUJKC Duel Server #1";
        this.bot.sendMessage(this.msg.channel, help);
        this.correct = false;
    } else if (/(wc|с)/.test(suffix.toLowerCase())) {
        this.ip = "185.117.155.181";
        this.port = 29070;
        this.desc = "Winter's Curse Server";
        this.loc = ":ru:";
    } else if (/(te|еst)/.test(suffix.toLowerCase())) {
        this.ip = "51.254.103.59";
        this.port = 29070;
        this.desc = "Test None Server";
        this.loc = ":no_entry_sign:";
    } else if (/(ds)/.test(suffix.toLowerCase())) {
        this.ip = "94.142.139.242";
        this.port = 29070;
        this.desc = "DarkSide Arena";
        this.loc = ":ru:";
    } else if (/(p|рb)/.test(suffix.toLowerCase())) {
        this.ip = "37.230.210.134";
        this.port = 29071;
        this.desc = "RussianPublic Server";
        this.loc = ":ru:";
    } else if (/(lo|оli)/.test(suffix.toLowerCase())) {
        this.ip = "46.228.195.123";
        this.port = 29000;
        this.desc = "Lolipop ESL Server";
        this.loc = ":de:";
    } else if (/(rjkc|с)/.test(suffix.toLowerCase())) {
        this.ip = "jk.extrajka.ru";
        this.port = 29070;
        this.desc = "RJKC Duel Server";
        this.loc = ":fr:";
    } else {
        var help = "Неверный ввод! Доступные варианты:\n" +
            "\n**\`!mon pb\`** - Russian Public Server" +
            "\n**\`!mon ds\`** - DarkSide Arena"+
            "\n**\`!mon wc\`** - Winter's Curse" +
            "\n**\`!mon loli\`** - Lolipop ESL" +
            "\n**\`!mon rjkc\`** - RUJKC Duel Server #1";
        this.bot.sendMessage(this.msg.channel, help);
        this.correct = false;
    }
}

MonitoringFunc.prototype.getServerStatus = function(){
    if (!this.correct) return;
    this.correct = false;
    var ip = this.ip;
    var port = this.port;
    var desc = this.desc;
    var socket = dgram.createSocket('udp4');
    this.socket = socket;
    var self = this;
    console.log("IP: " + ip);
    console.log("Port: " + port);
    console.log("Описание: " + desc);
    socket.on('message', function(msg){
        console.log(iconv.decode(msg, 'win1251'));
        self._parseString(iconv.decode(msg, 'win1251'));
    });
    socket.send(request, 0, request.length, port, ip);
    setTimeout(function(){
        self._closeSocket();
    }, 3000)
};

MonitoringFunc.prototype._parseString = function(response){ //parsing
    var loc = this.loc;
    var maps = {
        "mp/ffa1": "Vjun Sentinal",
        "mp/ffa2": "Korriban Tombs",
        "mp/ffa3": "Tatooine City",
        "mp/ffa4": "Rift Sanctuary",
        "mp/ffa5": "Taspir",
        "mp/duel1": "Bespin Courtyard",
        "mp/duel2": "Generator Room",
        "mp/duel3": "Imperial Shaft",
        "mp/duel4": "Imperial Control Room",
        "mp/duel5": "Taspir Landing",
        "mp/duel6": "Yavin Training Area",
        "mp/duel7": "Rancor Pit",
        "mp/duel8": "Abandoned City",
        "mp/duel9": "Hoth Canyon",
        "mp/duel10": "Vjun Fuel Processing",
        "mp/ctf1": "Imperial Drop Zone",
        "mp/ctf2": "Hoth Wasteland",
        "mp/ctf3": "Yavin Hilltops",
        "mp/ctf4": "Coruscant Streets",
        "mp/ctf5": "Factory",
        "t3home2": "Termninative Home",
        "asms": "Airkill Train Map (asms)"
    };
    var types = {
        0: "FreeForAll",
        3: "Duel",
        4: "PowerDuel",
        6: "TeamFFA",
        7: "Siege",
        8: "CaptureTheFlag"
    };
    var Cvars = {
        "fraglimit": pFraglimit.exec(response),
        "g_debugMelee": pMelee.exec(response),
        "g_forcePowerDisable": pForcepd.exec(response),
        "g_forceRegenTime": pFregen.exec(response),
        "gametype": pGametype.exec(response),
        "g_weaponDisable": pWeapdis.exec(response),
        "sv_allowDownload": pAllowdn.exec(response),
        "sv_floodProtect": pFloodp.exec(response),
        "sv_fps": pFPS.exec(response),
        "hostname": pHostname.exec(response)[1].replace(/\^\d/g, ''),
        "maxclients": pMaxclients.exec(response)[1],
        "timelimit": pTimelimit.exec(response),
        "g_needpass": pNeedpass.exec(response),
        "mapname": pMapname.exec(response)[1],
        "gamename": pGamename.exec(response)[1]
    };
    var lockness = ":unlock:";
    if (Cvars.g_needpass[1]==1) lockness = ":lock:";
    var map;
    if (maps[Cvars.mapname])  //:no_entry_sign:
    {
        map = maps[Cvars.mapname];
    } else map = Cvars.mapname;
    var players = response.split('\n');
    players = players.slice(2,players.length-1);
    console.log(players);
    var output = loc+' **Cервер:**                 ***'+Cvars.hostname+'*** '+lockness+
'\n        **IP:**                           *'+this.ip+':'+this.port+"*"+
'\n        **Карта:**                   '+map+
'\n        **Режим:**                  '+types[Cvars.gametype[1]]+
'\n        **Фраглимит:**         '+Cvars.fraglimit[1]+
'\n        **Таймлимит:**         '+Cvars.timelimit[1]+
'\n\n:white_check_mark: **Онлайн '+players.length+'/'+Cvars.maxclients+'**\n';
    if (players.length > 0) {
        var pattern = /(\d*)\s(\d*)\s"(.*?)"/;
        var playerTable = new Array();
        for (var player in players) {
            var t;
            var str = pattern.exec(players[player].replace(/\^\d/g, '')).slice(1);
            //console.log(str);
            t = str[0]
            str[0]=str[2]
            str[2]=t;
            playerTable.push(str);
        }
        playerTable.unshift(['Никнейм','Пинг','Фраги']);
        console.log(playerTable);
        playerTable = columnify(playerTable,{
            showHeaders: false,
            config: {
                0: {minWidth: 30},
                1: {minWidth: 5}
            }
        });
        //console.log(playerTable);
        output = output + "\`\`\`" + playerTable + "\`\`\`";
    }
    this.bot.sendMessage(this.msg.channel, output);
    this.correct = true;
};

MonitoringFunc.prototype._closeSocket = function(){ // closing socket
    if (!this.correct) this.bot.sendMessage(this.msg.channel, "Сервер не отвечает!");
    console.log("Closing the socket");
    this.socket.close();
};

var Monitoring = function (bot, msg, suffix){
    var mon = new MonitoringFunc(bot, msg, suffix);
    mon.getServerStatus();
}

// 1 digit
var pGametype = /\\g_gametype\\(\d)/;
var pAllowdn = /\\sv_allowDownload\\(\d)/;
var pFloodp = /\\sv_floodProtect\\(\d)/;
var pMelee = /\\g_debugMelee\\(\d)/;
var pNeedpass = /\\g_needpass\\(\d)/;
// 2 or more digits
var pFPS = /\\sv_fps\\(\d*)/;
var pFregen = /\\g_forceRegenTime\\(\d*)/;
var pForcepd = /\\g_forcePowerDisable\\(\d*)/;
var pWeapdis = /\\g_weaponDisable\\(\d*)/;
var pFraglimit = /\\fraglimit\\(\d*)/;
var pTimelimit = /\\timelimit\\(\d*)/;
var pMaxclients = /\\sv_maxclients\\(\d*)/;
// String
var pGamename = /\\gamename\\(.*?)\\?/;
var pMapname = /\\mapname\\(.*?)\\/;
var pHostname = /\\sv_hostname\\(.*?)\\/;
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Monitoring;