/**
 * Created by Administrator on 2016/10/5.
 */
/*let settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port),
 {safe: true});*/
const db_info = require('../../settings')
const mongoose = require('mongoose'),
  DB_URL = 'mongodb://' + db_info.user + ':' + db_info.password +
    '@' + db_info.mongodb.development.connectionString + '/blog'
console.log(DB_URL)
var options = {
  useNewUrlParser: true
}
mongoose.Promise = global.Promise
const connect = mongoose.connect(DB_URL, options)

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL + 'succeed')
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
