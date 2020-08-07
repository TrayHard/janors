const Module = require('../../lib/types/Module');
const Pugbot = new Module("Pugbot")

Pugbot.findCmds(__dirname)

module.exports = Pugbot