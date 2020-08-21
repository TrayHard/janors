const Service = require('../../../lib/types/Service');
const Ladder = require('../classes/Ladder')
const log = require('../../../lib/utils/logger');
const { errTypes } = require('../../../lib/utils/logger');

let laddersSettings = require('../assets/ladders.json');

const LadderService = new Service({
    name: "Ladder Service",
    desc: "Service for launching ladder proccesses",
    init: async (bot) => {
        try {
            let ladders = []
            laddersSettings = JSON.parse(JSON.stringify(laddersSettings))
            for (const ladderElement of laddersSettings) {
                await ladders.push(new Ladder(ladderElement))
            }
        } catch (error) {
            log.error(errTypes.Module, error)
        }
    }
})

module.exports = LadderService