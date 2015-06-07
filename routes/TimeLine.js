var express = require('express');
var router = express.Router();
var redis = require('redis');
require('date-utils');

client = redis.createClient();

client.subscribe('Channel');
client.on("message", function(channel, message) {
    sys.puts(channel + " :" + message);
});

client.publish("Channel", "Timeline test");

var checkSessionId = function(sessionId, id){
  client.get(sessionId, function(err, reply){
    if(err){throw err;}
    else if(reply == id){
      return true;
    }
    return false;
  });
}

module.exports = router;
