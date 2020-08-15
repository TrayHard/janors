const botconfig = require("dotenv").config().parsed
const mongoose = require('mongoose');
const models = require('./models');
const log = require('../lib/utils/logger');

mongoose.connect(`mongodb+srv://${botconfig.DB_LOGIN}:${botconfig.DB_PASS}@discordladder.qmkqw.mongodb.net/${botconfig.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res) => log.print(`Database (${botconfig.DB_NAME}) connected!`.cyan))
    .catch(err => log.error(log.errTypes.DB, err));

module.exports = mongoose