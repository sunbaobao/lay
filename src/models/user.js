/**
 * Created by Administrator on 2016/10/6.
 */
// let mongoose = require('../db/mongo');
// let Schema = mongoose.Schema;
// let UserSchema = new Schema({
//     username: {type: String},                    //用户账号
//     password: {type: String},                        //密码
//     email: {type: String},
//     socketID:{type:String},
//     sign:{type:String},
//     avatar:{type:String,default:"images/avatar.jpg"},
//     friend: Schema.Types.Mixed,
//     group:Schema.Types.Mixed,
//     salt: {type: String}
// });
// UserSchema.methods.isLogin = function () {
//
// };

import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;
const UserSchema = new Schema({
    username: String,
    password: String,
    avatar: {type: String, default: "images/avatar.jpg"},
    tel: Number,
    email: String,
    nickname: String,
    gender: String,
    birthday: Date,
    loginAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    lockUntil: {
        type: Number,
    },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    update_at: Date,
    friend: Schema.Types.Mixed,
    group: Schema.Types.Mixed,
    salt: {type: String},
    sign:String,
    roles: {
        type:Array,
        default:['visitor']
    }
});

const reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2,
};

UserSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return crypto.createHash('md5').update(candidatePassword).digest('hex') === this.password
};

UserSchema.methods.incLoginAttempts = function () {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: {loginAttempts: 1},
            $unset: {lockUntil: 1}
        })
    }
    // otherwise we're incrementing
    const updates = {$inc: {loginAttempts: 1}};
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = {lockUntil: Date.now() + LOCK_TIME}
    }
    return this.updateOne(updates)
};

UserSchema.statics.getAuthenticated = function (username, password) {
    return this.findOne({username: username})
        .then(doc => {
            // make sure the user exists
            if (!doc) {
                return reasons.NOT_FOUND
            }
            // check if the account is currently locked
            console.log(doc.isLocked);
            if (doc.isLocked) {
                return doc.incLoginAttempts().then(() => reasons.MAX_ATTEMPTS)
            }
            // test for a matching password
            if (doc.comparePassword(password)) {
                // if there's no lock or failed attempts, just return the doc
                if (!doc.loginAttempts && !doc.lockUntil) return doc
                // reset attempts and lock info
                const updates = {
                    $set: {loginAttempts: 0},
                    $unset: {lockUntil: 1}
                };
                return doc.updateOne(updates).then(() => doc)
            }
            // password is incorrect, so increment login attempts before responding
            return doc.incLoginAttempts().then(() => reasons.PASSWORD_INCORRECT)
        })
};

export default mongoose.model('user', UserSchema)

