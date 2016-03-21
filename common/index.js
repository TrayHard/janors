'use strict'
var Info =
{
    Help: require('./info/help.js'),
    Avatar: require('./info/avatar.js'),
    Members: require('./info/members.js'),
    WhoIs: require('./info/whois.js'),
    ServInfo: require('./info/serverinfo.js'),
    Test: require('./info/test.js'),
    Time: require('./info/time.js')
}
var Fun =
{
    Shar: require('./fun/shar.js'),
    Monetka: require('./fun/monetka.js'),
    Choice: require('./fun/choice.js'),
    Quotes: require('./fun/quotes.js'),
    Kosti: require('./fun/kosti.js'),
    Say: require('./fun/say.js'),
    Meme: require('./fun/memes.js'),
    Emotes: require('./fun/emotes.js'),
    Gifka: require('./fun/gifka.js')
}
var Useful =
{
    YouTube: require('./useful/youtube.js'),
    Wikipedia: require('./useful/wiki.js'),
    Slovar: require('./useful/slovar.js')
}

module.exports.Info = Info;
module.exports.Fun = Fun;
module.exports.Useful = Useful;