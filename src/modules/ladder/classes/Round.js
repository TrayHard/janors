module.exports = class Round {
    constructor() {
        this.winner = null
        this.submittedScores = {
            p1: null,
            p2: null
        }
        this.player1AcceptedScores = null
        this.player2AcceptedScores = null
        this.startDate = null
        this.suggestedStartDate = null
        this.player1AcceptedStartDate = null
        this.player2AcceptedStartDate = null
    }
}