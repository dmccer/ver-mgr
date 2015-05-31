var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repos = new Schema({
  name: String,
  url: String,
  version: String,
  owner: String,
  download: String,
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
});

repos.set('toObject', {
  versionKey: false,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Repos', repos);
