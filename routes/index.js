var express = require('express');
var router = express.Router();
var wechat = require('wechat')
var allConfig = require('../config')
var models = require('../models')
var Game = models.Game

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
    var content = message.Content
    if(isNaN(content)) {
	
        if(allConfig.deleteConfig[content]) {
            Game.remove({count:allConfig.deleteConfig[content]}, function(err, game) {
                res.reply({
                    type: 'text',
                    content: '游戏重置'
                })
            })
        } else {
            res.reply({
                type: 'text',
                content: '别乱玩，会出事的'
            })
        }
	return
    }
    var content = parseInt(message.Content)
     if(allConfig.gameConfig[content]) {
        Game.findOne({count:content}, function(err, game) {
            if(!game) {
                newGame(game, message, function(g, char) {
                    res.reply({
                        type: 'text',
                        content: '你是 \'' + char + ' \''
                    })
                })
            } else {
                var arr = game.characters
                if(arr.length == 0) {
                    res.reply({
                        type: 'text',
                        content: '人数已经满了'
                    })
                } else if(checkIfExist(game.players, message.FromUserName)){
                    res.reply({
                        type: 'text',
                        content: '你已经被分配身份了'
                    })
                } else {
                    updateGame(game, message, function(g, char) {
                        res.reply({
                            type: 'text',
                            content: '你是 \'' + char + ' \''
                        })
                    })
                }
            }
        })
     } else {
         res.reply({
            content: '没有这个人数的配置',
             type: 'text'
         })
     }
})))

router.get('/wechat', wechat(config, wechat.text(function(message, req, res, next) {
})))

var updateGame = function(game, message, cb) {
    var arr = game.characters
    var rn = parseInt(Math.random() * arr.length)
    var char = arr[rn]
    var players = game.players
    arr.splice(rn, 1)
    game.characters = arr
    players.push({
        nickName:message.FromUserName,
        character: char
    })
    game.players = players
    game.save(function(err, g) {
        cb(g, char)
    })
}

var checkIfExist = function(arr, name) {
    var i = false
    for(var k = 0; k < arr.length; k++) {
        var p = arr[k]
        if (p.nickName == name) {
            i = true
            break
        }
    }
    return i
}

var newGame = function(game, message, cb) {
    var content = parseInt(message.Content)
    var ca = allConfig.gameConfig[content]
    var arr = transformCharacter(ca)
    var rn = parseInt(Math.random() * arr.length)
    var char = arr[rn]
    arr.splice(rn, 1)
    game = new Game({
        count: content,
        characters: arr,
        players:[{
            nickName: message.FromUserName,
            character: char
        }]
    })
    game.save(function(err, g) {
        cb(g, char)
    })
}

var transformCharacter = function(ca) {
    var arr = [];
    for(var k in ca) {
        var count = ca[k]
        for (var i = 0;i < count; i ++) {
            arr.push(k)
        }
    }
    return arr
}

module.exports = router;
