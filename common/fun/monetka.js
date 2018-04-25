/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Monetka (bot, msg) {
    var number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
        msg.author.send({files:[{attachment: 'images/coin_yes.png',name: 'coin_yes.png'}]}).catch(console.error);
        if(msg.channel!=msg.author.dmChannel) msg.delete();
        
    } else {
        msg.author.send({files:[{attachment: 'images/coin_no.png',name: 'coin_no.png'}]}).catch(console.error);
        if(msg.channel!=msg.author.dmChannel) msg.delete();
    }
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Monetka;