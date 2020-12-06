import mongoose  from 'mongoose';
const Schema = mongoose.Schema;
const Log = new Schema({
    browser: String,
    userName: String,
    description: String,
    IP: String,
    time:{
        type:Date
    }
});
export default mongoose.model("loginLog", Log);
