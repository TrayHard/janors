const validator = require("validator");

module.exports.lobbyValidation = function (msg, args) {
    let helpString = "`"+botconfig.PREFIX+"pug [2/3/any] [ip:port] [pw]`"
    let [lobbySize, server, password] = args;
    if (!["2", "3", "any"].includes(lobbySize)) {
        msg.channel.send("Неверный ввод данных. Ошибка при вводе количества игроков!\n"+helpString);
        return false;
    }
    if (server) {
        let serverArr = server.split(":");
        if (
            serverArr.length != 2 ||
            !(
                validator.isIP(serverArr[0], 4) ||
                validator.isFQDN(serverArr[0])
            ) ||
            !validator.isPort(serverArr[1])
        ) {
            msg.channel.send("Неверный ввод данных. Ошибка ввода айпи сервера!\n"+helpString);
            return false;
        }
    }
    return true
}