const LadderDB = require('../../../db/models/LadderDB');
const Participant = require('./Participant');
const log = require('../../../lib/utils/logger');
const mongoose = require('../../../db');

module.exports = class Ladder {
    constructor(params) {
        if (checkLadder(params.name)) {
            let err = `Ladder ${params.name} already exists`
            log.error(log.errTypes.DB, err)
            throw new Error(err)
        }
        this.name = params.name
        this.startPointAmount = params.startPointAmount
        this.openMatchesLimit = params.openMatchesLimit
        this.participants = []
        this.matches = []
        const ladder = new Ladder({
            _id: mongoose.Types.ObjectId(),
            name: params.name,
            startPointAmount: params.startPointAmount,
            openMatchesLimit: params.openMatchesLimit,
            participants: [],
            matches: []
        })
        ladder.save()
            .then(result => log.print(result))
            .catch(err => log.error(log.errTypes.DB, err));
    }
    async checkLadder(name) {
        return await Ladder.findOne({name})
    }
    static async getLadder(name) {
        try {
            const ladder = await Ladder.find({name})
            if (!ladder) return null
        } catch (error) {
            log.error(log.errTypes.Ladder, `Can't find ladder "${name}"`)
            return null
        }

    }
    isUserInLadder(userID) {
        return this.participants.some(el => el._id == userID)
    }
    // Вступить в ладдер (добавить участника)
    async addPlayer(userID) {
        try {
            if (this.isUserInLadder(userID))
                throw new Error("User is already in the ladder")
            // Creates new or gives existing user with this ID
            const user = new Participant({userID, points: this.startPointAmount})
            this.participants.push(user)
        } catch (error) {
            log.error(log.errTypes.Ladder, `Failed to add new user in ladder. \nReason: "${error}"`)
        }
    }
    // Выйти из ладдера
    removePlayer() {}
    // Вызвать игрока
    makeMatch () {}
    // Вывести таблицу
    showRanks () {}
}