const botconfig = require("dotenv").config().parsed
const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connect(`mongodb+srv://${botconfig.DB_LOGIN}:${botconfig.DB_PASS}@discordladder.qmkqw.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useMongoClient: true
})
    .then(() => console.log('MongoDB connected!'.green))
    .catch(err => console.error(colors.red(`DB connection error: ${err}`)));

module.exports = mongoose