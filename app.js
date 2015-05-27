var http = require('http');
var express = require('express');
var path = require('path');
var authorize = require('./service/authorize');
var api = require('./api-v1');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var methodOverride = require('method-override');
var session = require('express-session');
var errorHandler = require('errorhandler');
var logger = require('./logger')('vermgr');

var app = express();

// 连接数据库
require('./db');

app.set('port', process.env.PORT || 9876);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(log4js.connectLogger(logger, { level: 'auto' }));
app.use(methodOverride());
app.use(cookieParser('f2evermgr'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'f2evermgr'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authorize);
app.use('/v1', api);

if ('development' === app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  logger.info('静态资源版本管理服务器已启动，端口：' + app.get('port'));
});
