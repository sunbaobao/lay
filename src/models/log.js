var mongoose = require('../db/mongo')
var Schema = mongoose.Schema
var Log = new Schema({
  username: String,
  time: { type: Date, default: Date.now },
  IP: String,
  browser:String,
  description:String,
})
module.exports = mongoose.model('Log', Log)
