/**
 * Created by Илья on 17.03.2016.
 */
'use strict'
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const server = dgram.createSocket('udp4');
var ip = "37.230.210.134";
var port = 29071;
var desc = "None";

function Monitoring (bot, msg, suffix) {
    if (suffix === "wc") {
        ip = "185.117.155.181";
        port = 29070;
        desc = "Winter's Curse Server"
    } else if (suffix === "ds") {
        ip = "94.142.139.242";
        port = 29070;
        desc = "DarkSide Arena"
    } else if (suffix === "pb") {
        ip = "37.230.210.134";
        port = 29071;
        desc = "RussianPublic Server"
    } else if (suffix === "loli") {
        ip = "46.228.195.123";
        port = 29000;
        desc = "Lolipop ESL Server"
    } else if (suffix === "rjkc") {
        ip = "149.202.53.78";
        port = 29070;
        desc = "RJKC Duel Server"
    } else {
        ip = "37.230.210.134";
        port = 29071;
        desc = "RussianPublic Server"
    }
    console.log("IP: " + ip);
    console.log("Port: " + port);
    console.log("Описание: " + desc);
    server.bind(29000);
    server.on('error', function(err){
        console.log('server error:\n'+err.stack);
        server.close();
    });

    server.on('message', function(msg, rinfo) {
        console.log('server got:' + msg+ 'from' + rinfo.address+':'+rinfo.port);
    });

     server.on("listening", function () {
     var address = server.address();
     console.log("I am listening on " +
     address.address + ":" + address.port);
     });
    // Sending UDP request to JKA server
    var request = new Buffer ('\xff\xff\xff\xffgetstatus');
    client.bind(29070);
    client.on("close", function () {
        console.log("Клиент закрыт");
    });
    console.log("Отсылаем запрос: " + request);
    client.send(request, 0,
        request.length, port,
        ip, function (err, bytes) {
            if (err) {
                throw err;
            }
            // Reuse the message buffer,
            // or close client
            client.close();
        }
    );
    // Getting answer from it and printing it to the console
    server.on("close", function () {
        console.log("Сервер закрыт");
    });

}


/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Monitoring;