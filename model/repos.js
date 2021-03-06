/**
 * @file 仓库模型
 * @author Kane yunhua.xiao@guluauto.com
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repos = new Schema({
  // 项目名
  name: String,
  // 项目 git url
  url: String,
  // 项目版本
  version: String,
  // 项目拥有者或项目组名
  owner: String,
  // 静态包下载地址
  download: String,
  // 服务器发布状态，默认未发布
  // -1 - 发布失败
  // 0 - 未发布
  // 1 - 正在下载项目资源
  // 2 - 正在编译项目
  // 3 - 正在发布到静态服务器
  // 4 - 正在同步到七牛服务器
  // 5 - 正在更新数据库版本
  // 6 - 正在生成静态资源压缩包
  // 7 - 发布完成
  status: { type: Number, default: 0 },
  // 记录创建时间（首次发布时间）
  create_time: { type: Date, default: Date.now },
  // 记录更新时间（最后一次发布时间）
  update_time: { type: Date, default: Date.now }
});

// 返回数据给用户时，将 _id 属性重命名为 id
repos.set('toObject', {
  versionKey: false,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

/**
 * @module repos
 * @type {*|Model}
 */
module.exports = mongoose.model('Repos', repos);
