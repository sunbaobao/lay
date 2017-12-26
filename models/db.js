/**
 * Created by Administrator on 2016/10/5.
 */
/*let settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port),
 {safe: true});*/
const db_info = require('../settings');
let mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/blog';
console.log(DB_URL);
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },
    user: 'client1',
    pass: '150sun'
}
mongoose.Promise = global.Promise;
/**
 * 连接
 */
mongoose.connect(DB_URL,options);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;