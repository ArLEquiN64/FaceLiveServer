var express = require('express');
var router = express.Router();
var redis = require('redis');
require('date-utils');

client = redis.createClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id(\\d+)', function(req, res) {
  if(checkSessionId(req.query.sessionId, req.query.faceId)){
    client.get(req.params.id, function(err, reply){
      if(err){throw err;}
      else if(reply){
        if(req.query.faceId == req.params.id){
          createSessionId(req.query.faceId);
        }
        res.send(JSON.stringify(reply));
        return;
      }
      else{res.send("invalid id.");return;}
    });
    res.send("error occured");
  }
  res.send("invalid sessionId");
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
