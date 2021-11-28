const mongoose = require('mongoose');
const {Schema} = mongoose;
const serieSchema = new Schema({
    name: String,
    type: String,
    numberEpisode: Number,
    isFinish: Boolean,
    plateform: String
})

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie
