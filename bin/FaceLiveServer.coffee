express = require('express')
bodyParser = require('body-parser')
app = express()
app.use bodyParser.urlencoded { extended: false }

http = require('http').Server(app)
port = 8090

redis = require 'redis'

app.post '/redister', (req, res) ->
  client = redis.createClient()
  usr = req.body.username
  facePass = req.body.facePass
  client.set usr facePass

http.listen port, ->
  console.log "listening on *:", port
