const Command = require('../../../lib/types/Command');

const RankCmd = new Command({
    name: "Ranks",
    desc: "Cmd to check ranks in the ladder",
    triggers: ['ranks', 'ранги'],
    run: async (bot, userMsg, args) => {

    }
})

module.exports = RankCmd