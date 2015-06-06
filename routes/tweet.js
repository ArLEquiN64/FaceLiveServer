var express = require('express');
var router = express.Router();
var redis = require('redis');
require('date-utils');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(checkSessionId(req.body.sessionId, req.body.id)){
    client.get("fl-tweets", function(err, reply){
      if(err){throw err;}
      else if(reply){
        var dt = new Date();
        var json = JSON.parse(reply);
        json.tl.unshift({
          name: req.body.name,
          tweet: req.body.tweet,
          time: dt.toFormat("YYYYMMDDHH24MI")
        });
        if(!req.body.name || !req.body.tweet){res.send("luck params");return;}
        client.set("fl-tweets", JSON.stringify(json), function(err, keys_replies){
          if(err){throw err;}
          else{res.send(req.body.name + " tweet.");return;}
          return;
        });
      }
      else{res.send("error occured.");return;}
    });
  }
});

router.get('/', function(req, res, next) {
  if(req.query.sessionId, req.query.id){
    client.get("fl-tweets", function(err, reply){
      if(err){throw err;}
      else if(reply){
        res.send(reply);
        return;
      }
    });
  }
});

var checkSessionId = function(sessionId, id){
  client.get(sessionId, function(err, reply){
    if(err){throw err;}
    else if(reply == sessionId){
      return true;
    }
    return false;
  });
}

module.exports = router;
