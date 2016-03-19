/**
 * Created by Илья on 17.03.2016.
 */
'use strict'
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const request = new Buffer ('\xff\xff\xff\xff\x02getstatus', 'ascii');

function MonitoringFunc (bot, msg, suffix) {
    if (suffix === "wc") {
        this.ip = "185.117.155.181";
        this.port = 29070;
        this.desc = "Winter's Curse Server"
        this.loc = ":ru:";
    } else if (suffix === "ds") {
        this.ip = "94.142.139.242";
        this.port = 29070;
        this.desc = "DarkSide Arena"
        this.loc = ":ru:";
    } else if (suffix === "pb") {
        this.ip = "37.230.210.134";
        this.port = 29071;
        this.desc = "RussianPublic Server"
        this.loc = ":ru:";
    } else if (suffix === "loli") {
        this.ip = "46.228.195.123";
        this.port = 29000;
        this.desc = "Lolipop ESL Server"
        this.loc = ":de:";
    } else if (suffix === "rjkc") {
        this.ip = "jk.extrajka.ru";
        this.port = 29070;
        this.desc = "RJKC Duel Server"
        this.loc = ":fr:";
    } else {    //standard server
        this.ip = "37.230.210.134";
        this.port = 29071;
        this.desc = "RussianPublic Server"
        this.loc = ":ru:";
    }
    this.socket = null;
    this.bot = bot;
    this.msg = msg;
}

MonitoringFunc.prototype.getServerStatus = function(){
    var ip = this.ip;
    var port = this.port;
    var desc = this.desc;
    var bot = this.bot;
    var msg = this.msg;
    var socket = dgram.createSocket('udp4');
    this.socket = socket;
    var self = this;
    console.log("IP: " + ip);
    console.log("Port: " + port);
    console.log("Описание: " + desc);
    socket.on('message', function(msg){
        self._parseString(msg.toString());
    });
    socket.send(request, 0, request.length, port, ip);
}

MonitoringFunc.prototype._parseString = function(response){ //parsing
    var loc = this.loc;
    // 1 digit
    var pGametype = /g_gametype\\(\d)\\/;
    var pAllowdn = /sv_allowDownload\\(\d)\\/;
    var pFloodp = /sv_floodProtect\\(\d)\\/;
    var pMelee = /g_debugMelee\\(\d)\\/;
    var pNeedpass = /g_needpass\\(\d)\\/;
    // 2 or more digits
    var pFPS = /sv_fps\\(\d*\d)\\/;
    var pFregen = /g_forceRegenTime\\(\d*\d)\\/;
    var pForcepd = /g_forcePowerDisable\\(\d*\d)\\/;
    var pWeapdis = /g_weaponDisable\\(\d*\d)\\/;
    var pFraglimit = /fraglimit\\(\d)\\/;
    var pTimelimit = /timelimit\\(\d*\d)\\/;
    var pMaxclients = /sv_maxclients\\(\d*\d)\\/;
    // String
    var pGamename = /gamename\\(.*?)\\/;
    var pMapname = /mapname\\(.*?)\\/;
    var pHostname = /sv_hostname\\(.*?)\\/;

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
        "sv_hostname": pHostname.exec(response).toString().replace(/\^\d/g, ''),
        "maxclients": pMaxclients.exec(response),
        "timelimit": pTimelimit.exec(response),
        "g_needpass": pNeedpass.exec(response),
        "mapname": pMapname.exec(response),
        "gamename": pGamename.exec(response)
    }
    var lockness = ":unlock:";
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
    }
    var types = {
        0: "FreeForAll",
        3: "Duel",
        4: "PowerDuel",
        6: "TeamFFA",
        7: "Siege",
        8: "CaptureTheFlag"
    }
    var output = {
        all: loc+' **Cервер:**                 '+Cvars.hostname+' '+lockness+
'\n        **IP:**                            '+this.ip+':'+this.port+
'\n        **Карта:**                    '+maps[Cvars.mapname]+
'\n        **Режим:**                   '+types[Cvars.gametype]+"\n"+
'\n:white_check_mark: **Онлайн ('+2+'/'+Cvars.maxclients+')**'
    }
    bot.sendMessage(msg.channel, output);
    this._closeSocket();
};

MonitoringFunc.prototype._closeSocket = function(){ // closing socket
    console.log("Closing the socket");
    this.socket.close();
};
var Monitoring = new MonitoringFunc();
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Monitoring;

/*
var Players = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
    31: "",
    32: ""
}*/