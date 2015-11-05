var mongoose = require('mongoose')

var gameSchema = mongoose.Schema({
    count: Number,
    characters:[String],
    players:[{
        nickName: String,
        character: String
    }]
});
var Game = mongoose.model('Game', gameSchema)
module.exports = Game