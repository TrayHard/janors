const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ['OPEN', 'FINISHED', 'PROTEST', 'DEFLOSS', 'PENDING'] },
    ladder: { ref: 'ladder', type: mongoose.Schema.Types.ObjectId },
    player1: { ref: 'user', type: mongoose.Schema.Types.ObjectId },
    player2: { ref: 'user', type: mongoose.Schema.Types.ObjectId },
    winner: { type: Number },
    pointsCost: { type: Number },
    resultScores: {
        p1: { type: Number },
        p2: { type: Number }
    },
    rounds: [{
        winner: { type: Number },
        submittedScores: {
            p1: { type: Number },
            p2: { type: Number }
        },
        player1AcceptedScores: { type: Boolean, default: false },
        player2AcceptedScores: { type: Boolean, default: false },
        startDate: { type: Date, default: Date.now() },
        suggestedStartDate: { type: Date, default: Date.now() },
        player1AcceptedStartDate: { type: Boolean, default: false },
        player2AcceptedStartDate: { type: Boolean, default: false }
    }],
    medias: {
        demos: [{ type: String }],
        screenshots: [{ type: String }]
    },
})

module.exports = mongoose.model('match', matchSchema)