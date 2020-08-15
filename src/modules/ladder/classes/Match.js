const Round = require('./Round');

enum Status {
    Open ='OPEN',
    Finished = 'FINISHED'
    Protest = 'PROTEST'
    Defloss = 'DEFLOSS'
    Pending = 'PENDING'
}

module.exports = class Match {
    constructor(params) {
        this.id = params.id
        this.status = Status.Open
        this.ladder = params.ladder
        this.player1 = params.player1
        this.player2 = params.player2
        this.winner = null
        this.pointsCost = calculatePointsCost(this.player1, this.player2)
        this.resultScores = {
            p1: null,
            p2: null,
        }
        this.rounds = []
        this.medias = {
            demos: [],
            screenshots: [],
        }
    }

    calculatePointsCost(p1, p2) {
        return 16
    }
}