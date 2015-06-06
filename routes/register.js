var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  client.get(req.body.id, function(err, reply){
    if(err){throw err;}
    else if(!reply){
      var json = {
        name: req.body.name,
        mail: req.body.mail,
        tell: req.body.tell,
        twitter: req.body.twitter
      };
      if(!json.mail || !json.name || !req.body.id){res.send("luck params");return;}
      client.set(req.body.id, JSON.stringify(json), function(err, keys_replies){
        if(err){throw err;}
        else{res.send(req.body.name + " is registered.");return;}
        return;
      });
    }
    else{res.send("already registered.");return;}
  });
});

module.exports = router;
