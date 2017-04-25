const express=require("express");

const app = express();
const path=require("path");
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static(path.join(__dirname,"public")));

/*
app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});
*/
let gustNumber=0;
let nickNames={};
let rooms=[];
let currentRoom={};
io.on('connection', function(socket){
    socket.on('new message', function(msg){
        io.emit('chat message', msg)
    });
    socket.on("add user",function (user) {

       if(user){
           gustNumber++;
           nickNames[socket.id]=user;
           let logM="欢迎"+user+"加入聊天室(∩_∩)";
           io.emit("log",logM);
           //console.log(gustNumber);
       }
    });
    socket.on('disconnect', function(){
        if(typeof nickNames[socket.id]!=="undefined"){
            let user= nickNames[socket.id];
            delete nickNames[socket.id];
            gustNumber--;
            let logM=user+"退出了聊天室(づ｡◕‿‿◕｡)づ！";
            io.emit("log",logM);
            // console.log(gustNumber);
        }
    });
});
http.listen(4010, function(){
    console.log('listening on *:4010');
});