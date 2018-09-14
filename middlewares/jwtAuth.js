const redis = require('../db/redis');
const User = require('../models/user');

let Middlewares = {
    redisClient: redis.redisClient,
    TOKEN_EXPIRATION: 60,
    TOKEN_EXPIRATION_SEC: this.TOKEN_EXPIRATION * 60,
    /**
     * get token
     */
    getToken: function (headers) {
        if (headers && headers.authorization) {
            const authorization = headers.authorization;
            const part = authorization.split(' ');
            if (part.length === 2) {
                return part[1]
            }
        }
        return null
    },

    /**
     * Middleware for token verification
     */
    verifyToken:function(req, res, next) {
        const token = this.getToken(req.headers);
        this.redisClient.get(token, function(err, reply){
            if (err) return res.tools.setJson(500, '服务器错误');
            if (reply) return res.tools.setJson(401, '无权访问');
            User.findByIdAsync(req.user.id)
                .then(function (doc){
                    if (!doc) return res.tools.setJson(1, '用户不存在');
                    Object.assign(req.user, {
                        _id: doc._id,
                        username: doc.username,
                        avatar: doc.avatar,
                    });
                    return next()
                })
                .catch(function (err) {
                    next(err);
                })
        })
    },

    /**
     * redis set key
     */
    expireToken:function(headers) {
        const token = this.getToken(headers);

        if (token != null) {
            this.redisClient.set(token, true);
            this.redisClient.expire(token, this.TOKEN_EXPIRATION_SEC)
        }
    }
};

module.exports=Middlewares;