var express = require('express');
var router = express.Router();
var redis = require('redis');
require('date-utils');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  client.get("fl-tweets", function(err, reply){
    if(err){throw err;}
    else if(reply){
      var dt = new Date();
      var json = {
        name: req.body.name,
        tweet: req.body.tweet,
        time: dt.toFormat("YYYYMMDDHH24MI")
      };
      if(!json.name || !req.body.tweet){res.send("luck params");return;}
      client.set(req.body.id, JSON.stringify(JSON.parse(reply)+=json), function(err, keys_replies){
        if(err){throw err;}
        else{res.send(req.body.name + " tweet.");return;}
        return;
      });
    }
    else{res.send("error occured.");return;}
  });
});

router.get('/', function(req, res, next) {
  client.get("fl-tweets", function(err, reply){
    if(err){throw err;}
    else if(reply){
      res.send(reply);
      return;
    }
  });
});

module.exports = router;
