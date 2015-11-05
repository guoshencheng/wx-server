var mongoose = require('mongoose');
var db = 'mongodb://localhost:27017/killer';
mongoose.connect(db, {
    server: {poolSize: 20}
}, function(err) {
    //console.log(err.message);
    //console.error('connect to %s error:', db, err.message);
    //process.exit(1);
});

exports.Game = require('./game')