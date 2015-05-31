var repos = require('../model/repos');
var logger = require('../logger')('api');

var repos_ctrl = {
  // 获取单个项目的静态资源信息
  get: function(req, res) {
    repos.findOne({
      name: req.params.name,
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
  },

  // 添加项目的静态资源信息
  add: function(req, res) {
    repos.create({
      name: req.params.name || req.body.name,
      owner: req.body.owner,
      url: req.body.url,
      download: req.body.download,
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
        logger.info('查询参数: ' + req.query && JSON.stringify(req.query) || 'all');

        return res.status(200).json({
          data: docs
        });
      });
  },

  // 更新或添加单个项目静态资源信息
  update: function(req, res) {
    logger.trace('检测项目是否存在');

    var data = {
      name: req.params.name,
      owner: req.body.owner,
      version: req.body.version,
      download: req.body.download,
      update_time: Date.now()
    };

    if (req.body.url) {
      data.url = req.body.url;
    }

    // 这里有个bug
    // create_time 会更新
    repos.findOneAndUpdate({
      name: data.name,
      owner: data.owner
    }, data, {
      new: true,
      upsert: true
    }, function(err, doc) {
      if (err) {
        logger.fatal('更新或添加项目静态资源信息失败');
        logger.info(err && err.message);

        return res.status(500).json({
          msg: '更新或添加项目静态资源信息失败'
        });
      }

      logger.info('更新或添加项目静态资源信息成功');
      logger.info(JSON.stringify(data));

      return res.status(200).json({
        data: doc.toObject()
      });
    });
  }
};

module.exports = repos_ctrl;
