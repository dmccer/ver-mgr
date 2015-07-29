var _ = require('lodash');
var repos = require('../model/repos');
var logger = require('../logger')('api');

var repos_ctrl = {
  validate: function(name, owner) {
    return _.trim(name) && _.trim(owner);
  },

  // 获取单个项目的静态资源信息
  get: function(req, res) {
    var name = req.params.name;
    var owner = req.query.owner;

    if (!repos_ctrl.validate(name, owner)) {
      return res.status(422).json({
        msg: '缺少参数 name 或 owner'
      });
    }

    repos.findOne({
      name: name,
      owner: owner
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
    var name = req.params.name || req.body.name;
    var owner = req.body.owner;

    if (!repos_ctrl.validate(name, owner)) {
      return res.status(422).json({
        msg: '缺少参数 name 或 owner'
      });
    }

    repos
      .findOne({
        name: name,
        owner: owner
      })
      .exec()
      .then(function(doc) {
        if (doc) {
          throw new Error('项目已存在');
        }

        return repos
          .create({
            name: name,
            owner: owner,
            url: req.body.url,
            download: req.body.download,
            version: req.body.version,
            status: req.body.status
          });
      }, function(err) {
        logger.fatal('查询项目静态资源信息失败');
        logger.info(err.message);

        return res.status(500).json({
          msg: '查询项目静态资源信息失败'
        });
      })
      .then(function(doc) {
        logger.info('添加项目静态资源信息成功');
        logger.info(JSON.stringify(req.body));

        return res.status(200).json({
          data: doc.toObject()
        });
      }, function(err) {
        var err_msg = '添加项目静态资源信息失败, ' + err.message;
        logger.fatal(err_msg);

        return res.status(500).json({
          msg: err_msg
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

    var name = req.params.name;
    var owner = req.body.owner;

    var data = {
      name: name,
      owner: owner,
      update_time: Date.now()
    };

    if (!repos_ctrl.validate(name, owner)) {
      return res.status(422).json({
        msg: '缺少参数 name 或 owner'
      });
    }

    if (req.body.version) {
      data.version = req.body.version;
    }

    if (req.body.url) {
      data.url = req.body.url;
    }

    if (req.body.download) {
      data.download = req.body.download;
    }

    if (req.body.status) {
      data.status = req.body.status;
    }

    // create_time 仅在添加时写入
    data.$setOnInsert = {
      create_time: new Date()
    };

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
