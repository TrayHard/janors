const Command = require('../../../lib/types/Command');

const SubmitMatchCmd = new Command({
    name: "Submit Match",
    desc: "Cmd to submit match results in ladder",
    triggers: ['submit'],
    run: (bot, userMsg, args) => {
        
    }
})

module.exports = SubmitMatchCmd