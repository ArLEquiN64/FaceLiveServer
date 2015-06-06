express = require('express')
bodyParser = require('body-parser')
app = express()
app.use bodyParser.urlencoded { extended: false }

http = require('http').Server(app)
port = 8080

redis = require 'redis'

app.post '/redister', (req, res) ->
  client = redis.createClient()
  usr = req.body.username
  facePass = req.body.facePass
  client.set "fl-#{usr}", facePass, (err, Keys_repliys) ->
    if err
      throw err
    else
      res.send "complete #{usr}"

app.get '/login', (req, res) ->
  client = redis.createClient()
  usr = req.param('username')
  facePass = req.param('facePass')
  client.get "fl-#{usr}", (err, reply) ->
    if err
      throw err
    else if reply == facePass
      res.send "you're #{usr}"
    else
      res.send "not authed"

http.listen port, ->
  console.log "listening on *:", port
