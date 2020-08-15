const colors = require('colors');
const botconfig = require("dotenv").config().parsed

module.exports = {
    error: (type, ...message) => {
        console.error(colors.red(`[${type} error]: ${message}`))
    },
    warn: (...message) => {
        console.warn(colors.yellow(`[Warning]: ${message}`))
    },
    print: (...message) => {
        console.log(colors.green('[Log]:'), ...message)
    },
    debug: (...message) => {
        if (botconfig.DEBUG)
            console.log(colors.yellow('[Debug]:'), message.join(' ').gray)
    },
    errTypes: {
        DB: "Database",
        Ladder: "Ladder",
        Module: "Module",
    }
}