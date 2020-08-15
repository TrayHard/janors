const Command = require('../../../lib/types/Command');

const ChallengeCmd = new Command({
    name: "Challenge",
    desc: "Cmd to challenge someone for a match in ladder",
    triggers: ['challenge', 'вызвать'],
    run: (bot, userMsg, args) => {
        bot.send("challenge works!")
    }
})

module.exports = ChallengeCmd