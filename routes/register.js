var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var json = {
    name: req.body.name,
    mail: req.body.mail,
    tell: req.body.tell,
    twitter: req.body.twitter
  };
  if(!json.mail || !json.name || !req.body.id){res.send("luck params");return;}
  client.set(req.body.id, JSON.stringify(json), function(err, keys_replies){
    if(err){throw err;}
    else{res.send(req.body.name + "is registered.");}
  });
});

module.exports = router;
