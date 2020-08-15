const UserDB = require('../../../db/models/UserDB');
const log = require('../../../lib/utils/logger');

module.exports = class Participant {
    constructor(params) {
        let user = this.getUser(params.userID)
        if (user) {
            log.warn(`User ${params.userID} already exists`)
            Object.assign(this, {...user})
        } else {
            this._id = params.userID
            this.points = params.points
            this.lastMatchPlayed = null
            this.matchesPlayed = 0
            this.matchesWon = 0
            this.matchesLost = 0
            this.streak = 0
            this.defLosses = 0
            this.defWins = 0
            this.addUserToDB()
        }
    }

    async getUser(userID) {
        return await UserDB.findById(userID)
    }

    addUserToDB() {
        const user = new UserDB({
            _id: this.userID,
            points: this.points,
            lastMatchPlayed: null,
            matchesPlayed: 0,
            matchesWon: 0,
            matchesLost: 0,
            streak: 0,
            defLosses: 0,
            defWins: 0
        })
        user.save()
            .then(result => log.print(result))
            .catch(err => log.error(log.errTypes.DB, err));
    }
}