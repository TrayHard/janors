const Service = require('../../../lib/types/Service');
const Ladder = require('../classes/Ladder')
const log = require('../../../lib/utils/logger');

const LadderService = new Service({
    name: "Ladder Service",
    desc: "Service for launching ladder proccesses",
    init: (bot) => {
        log.print('Service works!')
    }
})

module.exports = LadderService