/**
 * Created by uu on 2019/3/19.
 */
const mongoose = require('../db/mongo');
const Schema = mongoose.Schema;
const Token = new Schema({
    id: String,
    token:String,
    createAt:{
        type:Date,
        default:Date.now()
    },
    tokenName:String,
    notes:String,
    expressIn:{
        type:Date
    }
});
module.exports = mongoose.model("Token", Token);
