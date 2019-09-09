const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../settings');

module.exports = {
    TOKEN_SECRET: config.secret,
    setToken(id) {
        return jwt.sign({
            id: id
        }, this.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        })
    },
    setMd5(value) {
        return crypto.createHash('md5').update(value).digest('hex')
    }
}