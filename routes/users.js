var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

var ws = require('websocket.io');
var server = ws.listen(8888, function () {
  console.log('\033[96m Server running at :8888 \033[39m');
});

// クライアントからの接続イベントを処理
server.on('connection', function(socket) {
  // クライアントからのメッセージ受信イベントを処理
  socket.on('message', function(data) {
    // 実行時間を追加
    var data = JSON.parse(data);
    var d = new Date();
    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    data = JSON.stringify(data);
    console.log('\033[96m' + data + '\033[39m');

    // 受信したメッセージを全てのクライアントに送信する
    server.clients.forEach(function(client) {
      client.send(data);
    });
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id(\\d+)', function(req, res) {
  client.get(req.params.id, function(err, reply){
    if(err){throw err;}
    else if(reply){res.send(JSON.stringify(reply));return;}
    else{res.send("invalid id.");return;}
  });
  res.send("error occured");
});

module.exports = router;
