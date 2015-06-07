var ws = require('websocket.io');
var server = ws.listen(8888, function () {
  console.log('WS Server runnninng at 8888');
});

server.on('connection', function(socket) {
  socket.on('message', function(data) {
    var data = JSON.parse(data);
    var d = new Date();
    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    data = JSON.stringify(data);
    console.log('\033[96m' + data + '\033[39m');

    server.clients.forEach(function(client) {
      client.send(data);
    });
  });
});
