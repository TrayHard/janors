module.exports.run = async (bot, message, args) => {
    // !duel [rujka.ru:29080] [password]
    message.delete() // deletes ur msg after sending !pug
    let author = message.author.username
    let avatar = message.author.displayAvatarURL()
    let [server, password] = args
}

module.exports.help = {
    name: "duel",
    aliases: ["дуэль"]
}