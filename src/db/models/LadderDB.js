const mongoose = require('mongoose');

const ladderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    startPointAmount: Number,
    openMatchesLimit: Number,
    participants: [],
    matches: []
})

module.exports = mongoose.model('ladder', ladderSchema)