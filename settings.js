/**
 * Created by Administrator on 2016/10/5.
 */
module.exports = {
    cookieSecret: 'myblog',
    db: 'blog',
    host: 'localhost',
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
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};


