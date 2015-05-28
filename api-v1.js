var express = require('express');
var router = express.Router();
var repos = require('./service/repos');

router.get('/', function (req, res) {
  res.status(200).render('api');
});

// 查询项目列表
router.get('/repos', repos.list);
// 获取单个项目
router.get('/repos/:name', repos.get);
// 添加
router.post('/repos', repos.add);
// 添加和更新
router.post('/repos/:name', repos.update);

module.exports = router;
