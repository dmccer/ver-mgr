var express = require('express');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var logger = require('./logger')('expres');
var authorize = require('./service/authorize');
var api = require('./api-v1');
var app = express();

app.use(log4js.connectLogger(logger, { level: 'auto' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authorize);
app.use('/v1', api);

var server = app.listen(9876, function() {
  var host = server.address().address;
  var port = server.address().port;

  logger.info('静态资源版本管理服务器已启动，地址：' + host + '，端口：' + port);
});
