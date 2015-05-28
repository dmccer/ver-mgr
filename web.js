var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).render('welcome');
});

router.get('/api', function (req, res) {
  res.status(200).render('api');
});

module.exports = router;
