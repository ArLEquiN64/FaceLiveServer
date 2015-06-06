var express = require('express');
var router = express.Router();
var redis = require('redis');
client = redis.createClient();
var sleep = require('sleep-async')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
  var sessionId = createSessionId(req.query.id);
  res.send(sessionId.toString())
});

var createSessionId = function(id){
  var sessionId = Math.floor(Math.random() * 100000000);
  client.set(sessionId, id, function(err, reply){
    if(err){throw err;}
  });
  sleep.sleep(300000, function() {
    client.del(sessionId, function(err, reply){
      if(err){throw err;}
    });
  });
  return sessionId;
}

module.exports = router;
