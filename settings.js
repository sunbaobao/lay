/**
 * Created by Administrator on 2016/10/5.
 */
// db.createUser({ user: "client", pwd: "150sun", roles: [{ role: "readWrite", db: "blog" }] })


module.exports = {
    cookieSecret: 'myblog',
    db: 'blog',
    host: '129.28.184.17',
    port: 27017,
    user:"client",
    password:"150sun",
    redis:{
        development: {
            connectionString: 'redis://127.0.0.1:6379'
        },
        production: {
            connectionString: 'redis://127.0.0.1:6379',
        }
    },
    mongodb:{
        development: {
            connectionString: '129.28.184.17:27017'
        },
        production: {
            connectionString: '129.28.184.17:27017',
        }
    },
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    superAdmin: {
        username: 'admin',
        password: '123456',
    },
    orderStatus: {
        'submitted': '已提交',
        'canceled' : '已取消',
        'confirmed': '已确认',
        'finished' : '已完成',
    },
    wechat: {
        appid: 'wxf1d3181c8a921b80',
        secret: '53dfef4e1f43cf2fe1e322582e6fa5e7',
    },
};


