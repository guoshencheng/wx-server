var express = require('express');
var router = express.Router();
var wechart = require('wechat')

var config = {
    token: 'guoshencheng',
    appid: 'wx6f6c7828adb6b4a4',
    encodingAESKey: 'a6A2gGxXu5lAKc2lz9njpBQa01BJRFMSChQPg6ttl8l'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wechat', wechart(config, function(req, res, next) {

}))

module.exports = router;
