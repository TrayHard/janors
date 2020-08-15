const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: Number,
    points: Number,
    lastMatchPlayed: Date,
    matchesPlayed: Number,
    matchesWon: Number,
    matchesLost: Number,
    streak: Number,
    defLosses: Number,
    defWins: Number
})

module.exports = mongoose.model('user', userSchema)