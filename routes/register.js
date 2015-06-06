var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var json = {name: req.body.name, mail: req.body.mail};
  if(req.body.tell){json.mail = req.body.tell;}
  if(req.body.twitter){json.twitter = req.body.twitter;}
  client.set(req.body.id, JSON.stringify(json), function(err, keys_replies){
    if(err){throw err;}
    else{res.send(req.body.name + "is registered.");}
  });
});

module.exports = router;
