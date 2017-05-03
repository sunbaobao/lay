/**
 * Created by uu on 2017/4/24.
 */
const gustNumber = 0;
const nickNames = {};
const rooms = [];
const currentRoom = {};
const user = [];
const autoReplay = [
    '您好，我现在有事不在，一会再和您联系。',
    '你没发错吧？face[微笑] ',
    '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
    '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
    'face[威武] face[威武] face[威武] face[威武] ',
    '<（@￣︶￣@）>',
    '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
    'face[黑线]  你慢慢说，别急……',
    '(*^__^*) face[嘻嘻] ，是贤心吗？'
];
const server=require("./bin/www");
const io = require('socket.io')(server);
const Msg=require("./models/msg");
io.on('connection', function (socket) {
    console.log("connect");
    socket.on('message', function (d) {
        // console.log(d);
        switch (d.type) {
            /*用户上线*/
            case 'reg':
                user[d.content.uid] = socket.id;
                for(let i in d.content.group){
                    rooms[d.content.group[i].id]=1;
                    socket.join(d.content.group[i].id);
                }
                let num = 0, uuser = [];
                for (x in user) {
                    uuser.push(x);
                    num++;
                }
                d.content.num = num;

                //全局事件
                socket.broadcast.emit('addList', d.content);

                ///发给自己
                let reguser = {uuser: uuser, num: num};
                socket.emit('reguser', reguser);

                console.log('用户上线了：用户id=' + d.content.uid + '| 客户端id=' + socket.id);
                break;

            /*用户发送消息*/
            case 'chatMessage':
                let mydata = {
                    username: d.content.mine.username,
                    avatar: d.content.mine.avatar,
                    id: d.content.mine.id,
                    content: d.content.mine.content,
                    type: d.content.to.type,
                    toid: d.content.to.id
                };
                /*处理单聊事件*/
                if (d.content.to.type === 'friend') {
                    console.log("1 friend",mydata.toid);
                    if (user[mydata.toid]) {/*广播消息*/
                        console.log(user[mydata.toid]);
                        socket.broadcast.to(user[mydata.toid]).emit('chatMessage', mydata);
                        // io.sockets.sockets[user[mydata.toid]].emit('chatMessage', mydata);
                        console.log('【' + d.content.mine.username + '】对【' + d.content.to.username + '】说:' + d.content.mine.content)
                    } else {
                        socket.emit('noonline', mydata);
                    }


                    /*处理群聊事件*/
                } else if (d.content.to.type === 'group') {
                    mydata.id = mydata.toid;
                    console.log("toid",mydata.toid);
                    // socket.broadcast.emit('chatMessage', mydata);
                    socket.to(mydata.toid).emit('chatMessage',mydata)
                }
                break
        }
        /*注销事件*/
    })
        .on('disconnect', function () {
            // console.log("")
            let outid = 0, usernum = 0;
            for (x in user) {
                usernum++;
                console.log(x);
                if (user[x] === socket.id) {
                    outid = x;
                    delete user[x]
                }
            }
            console.log('用户ID=' + outid + '下线了');
            let out = {id: outid, num: usernum - 1}
            io.sockets.emit('out', out);
        });
    socket.on('addFriend', function (data) {
       let myMsg=new Msg(data);
        myMsg.save();
        Msg.find({read:false},function (err, messages) {
           if(err){ console.log(err); return;}
           let thisM=[];
           for (let m in messages){
               if(messages[m].to_id===data.to_id.toString()){
                   thisM.push(messages[m]);
               }
           }
           let l=thisM.length;
            if (user[data.to_id]) {
                console.log("在线");
                let mydata = {};
                console.log(data.user);
                socket.broadcast.to(user[data.to_id]).emit('addM',{code:0, msg:l});
                // io.sockets.sockets[user[data.user.id]].emit("addM", {code: 0, msg: l});
            } else {
                console.log("不在线");
                // Msg[data.uid].push(data);

            }
        });
        /*Msg[data.uid]= Msg[data.uid]||[];
        let l=Msg[data.uid].length||0;*/
        console.log(data);
    });
    socket.on("addGS",function (data) {
        io.to(data.id).emit("addGS",{
            system: true
            , id: data.id
            , type: "group"
            , content: data.username+ '加入群聊!'
        })
    })
});
function handERr(res,msg) {
}

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