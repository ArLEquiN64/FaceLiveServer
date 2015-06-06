var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id(\\d+)', function(req, res) {
  client.get(req.params.id, function(err, reply){
    if(err){throw err;}
    else if(reply){res.send(JSON.stringify(reply));return;}
    else{res.send("invalid id.");return;}
  });
  res.send("error occured");
});

module.exports = router;
