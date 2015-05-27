var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repos = new Schema({
  name: String,
  url: String,
  version: String,
  owner: String,
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repos', repos);
