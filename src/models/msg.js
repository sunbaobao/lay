/**
 * Created by uu on 2017/4/24.
 */
const mongoose = require('../db/mongo');
const Schema = mongoose.Schema;
let MsgSchema = new Schema({
    id:String,
    content: {type: String},
    uid: {type: String},
    from: {type: String},
    from_group: {type: String},
    type:{type:String},
    remark:{type:String},
    read:{type:Boolean},
    time:{type:Date, default: Date.now},
    to_id:String,
    user:Schema.Types.Mixed
});
module.exports = mongoose.model('Msg', MsgSchema);
/**
 *{ "id": 76,
 "content": "申请添加你为好友",
 "uid": 168,
 "from": 166488,
 "from_group": 0,
 "type": 1,
 "remark": "有问题要问",
 "href": null,
 "read": 1,
 "time": "刚刚",
 "user": {
        "id": 166488,
        "avatar": "//q.qlogo.cn/qqapp/101235792/B704597964F9BD0DB648292D1B09F7E8/100",
        "username": "李彦宏",
        "sign": null
      }
   }
 */
