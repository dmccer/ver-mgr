var SparkMD5 = require('spark-md5');
var config = require('../config');
var logger = require('../logger')('authorize');

module.exports = function(req, res, next) {
  logger.info('正在进行身份验证...');
  var authorization = req.headers.Authorizatioin;
  var secret_token = SparkMD5.hash(config.access_secret + config.subffix, true);

  if (!authorization || authorization !== secret_token) {
    logger.fatal('身份验证失败');
    logger.info('用户 token: ' + authorization);
    logger.info('正确 token: ' + secret_token);

    res.status(403).json({
      msg: '您没有权限'
    });

    return;
  }

  logger.info('身份验证通过');

  next();
};
