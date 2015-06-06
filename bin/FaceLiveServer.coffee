app = require('express')()
http = require('http').Server(app)
port = 8090

redis = require 'redis'

app.get '/', (req, res) ->
  res.send 'coffeeTest.html'

http.listen port, ->
  console.log "listening on *:", port
