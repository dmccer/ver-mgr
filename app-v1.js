var express = require('express');
var router = express.Router();
var repos = require('./service/repos');

router.get('/', function (req, res) {
  res.status(200).render('welcome');
});

router.get('/repos', repos.list);
router.get('/repos/:name', repos.get);
router.post('/repos', repos.add);
router.put('/repos/:name', repos.update);

module.exports = router;
