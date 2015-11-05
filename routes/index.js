var express = require('express');
var router = express.Router();
var wechat = require('wechat')

var config = {
    token: 'guoshencheng',
    appid: 'wx6f6c7828adb6b4a4',
    encodingAESKey: 'a6A2gGxXu5lAKc2lz9njpBQa01BJRFMSChQPg6ttl8l'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/wechat', wechat(config, wechat.text(function(message, req, res, next) {
    if(message.content == '狼人') {
        res.reply({
            type: 'text',
            content:'close your eyes'
        })
    }
})))

router.get('/wechat', wechat(config, wechat.text(function(message, req, res, next) {
})))

module.exports = router;
