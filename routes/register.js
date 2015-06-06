var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('register ' + req.query.user);
});

module.exports = router;
