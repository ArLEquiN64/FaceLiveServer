var express = require('express');
var router = express.Router();
var redis = require('redis');

client = redis.createClient();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var json = {name: req.query.name, mail: req.query.mail};
  if(req.query.tell){json.mail = req.query.tell;}
  if(req.query.twitter){json.twitter = req.query.twitter;}
  client.set(req.query.id, json,function(err, keys_replies){
    if(err){throw err;}
    else{
    res.OK(req.query.name + "is registered.");}
  });
  res.send("error occured");
});

module.exports = router;
