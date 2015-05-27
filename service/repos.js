var repos = require('../model/repos');
var logger = require('../logger')('api');

function unexpect(req, res) {
  // 真的会进入到这里吗？
  // 不妨试一试
  logger.error('这真的是个意外，请重试');
  logger.info('请求参数: ' + req.body && JSON.stringify(req.body));

  res.status(500).json({
    msg: '这真的是个意外，请重试'
  });
}

module.exports = {
  // 获取单个项目的静态资源信息
  get: function(req, res) {
    repos.findOne({
      name: req.query.name,
      owner: req.query.owner
    }, function(err, doc) {
      if (err) {
        logger.fatal('查询项目静态资源信息失败');
        logger.info(err.message);

        return res.status(500).json({
          msg: '查询项目静态资源信息失败'
        });
      }

      if (!doc) {
        return res.status(200).json({
          msg: '没有找到该项目'
        });
      }

      return res.status(200).json({
        data: doc.toObject()
      });
    });

    unexpect(req, res);
  },

  // 添加项目的静态资源信息
  post: function(req, res) {
    repos.create({
      name: req.body.name,
      owner: req.body.owner,
      url: req.body.url,
      version: req.body.version
    }, function(err, doc) {
      if (err || !doc) {
        logger.fatal('添加项目静态资源信息失败');
        logger.info(err.message);

        return res.status(500).json({
          msg: '添加项目静态资源信息失败'
        });
      }

      logger.info('添加项目静态资源信息成功');
      logger.info(JSON.stringify(req.body));

      return res.status(200).json({
        data: doc.toObject()
      });
    });

    unexpect(req, res);
  },

  // 获取项目列表
  list: function(req, res) {
    repos
      .find(req.query || {})
      .limit(20)
      .sort('-create_time')
      .exec(function(err, docs) {
        if (err) {
          logger.fatal('查询项目列表失败');
          logger.info(err.message);

          return res.status(500).json({
            msg: '查询项目列表失败'
          });
        }

        logger.info('查询项目列表成功');
        logger.info(req.query && JSON.stringify(req.query) || 'all');

        return res.status(200).json({
          data: docs.toObject()
        });
      });

    unexpect(req, res);
  },

  // 更新单个项目静态资源信息
  update: function(req, res) {
    repos.findOneAndUpdate({
      name: req.body.name,
      owner: req.body.owner
    }, {
      version: req.body.version,
      url: req.body.url
    }, function(err, doc) {
      if (err || !doc) {
        logger.fatal('更新项目静态资源信息失败');
        logger.info(err && err.message || '没找到您要更新的项目');

        return res.status(500).json({
          msg: '更新项目静态资源信息失败'
        });
      }

      logger.info('更新项目静态资源信息成功');
      logger.info(JSON.stringify(req.body));

      return res.status(200).json({
        data: doc.toObject()
      });
    });

    unexpect(req, res);
  }
};
