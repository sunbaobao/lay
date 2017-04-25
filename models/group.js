/**
 * Created by uu on 2017/4/25.
 */
let mongoose = require('./db');
let Schema = mongoose.Schema;
let Group = new Schema({
    id: String,
    groupname:String,
    avatar: {type:String,default:"images/groupAvatar.jpg"},
    list: Schema.Types.Mixed
});
module.exports = mongoose.model("Group", Group);
