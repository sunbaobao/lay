#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('Ejs:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// const io = require('socket.io')(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

/*const gustNumber = 0;
const nickNames = {};
const rooms = [];
const currentRoom = {};
const user = [];
const Msg = [];
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
io.on('connection', function (socket) {
    socket.on('message', function (d) {
        // console.log(d);
        switch (d.type) {
            /!*用户上线*!/
            case 'reg':
                user[d.content.uid] = socket.id;
                var num = 0, uuser = [];
                for (x in user) {
                    uuser.push(x);
                    num++;
                }
                d.content.num = num;

                //全局事件
                socket.broadcast.emit('addList', d.content);


                ///发给自己
                var reguser = {uuser: uuser, num: num};
                socket.emit('reguser', reguser);

                console.log('用户上线了：用户id=' + d.content.uid + '| 客户端id=' + socket.id);
                break;

            /!*用户发送消息*!/
            case 'chatMessage':
                var mydata = {
                    username: d.content.mine.username,
                    avatar: d.content.mine.avatar,
                    id: d.content.mine.id,
                    content: d.content.mine.content,
                    type: d.content.to.type,
                    toid: d.content.to.id
                };
                /!*处理单聊事件*!/
                if (d.content.to.type === 'friend') {
                    console.log("1 friend");
                    if (user[mydata.toid]) {/!*广播消息*!/
                        io.sockets.sockets[user[mydata.toid]].emit('chatMessage', mydata);
                        console.log('【' + d.content.mine.username + '】对【' + d.content.to.username + '】说:' + d.content.mine.content)
                    } else {
                        socket.emit('noonline', mydata);
                    }


                    /!*处理群聊事件*!/
                } else if (d.content.to.type === 'group') {
                    mydata.id = mydata.toid;
                    socket.broadcast.emit('chatMessage', mydata)
                }
                break
        }

        /!*注销事件*!/
    })
        .on('disconnect', function () {
            let outid = 0, usernum = 0;
            for (x in user) {
                usernum++;
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
        if(Msg[data.uid]){

        }
        let l=Msg[data.uid].length;
        if (user[data.uid]) {
            let mydata = {};
            io.sockets.sockets[user[data.uid]].emit("addM", {code: 0, msg: l});
        } else {
            Msg[data.uid].push(data);

        }
        console.log(data);
    })
});*/

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
};
module.exports=server;
