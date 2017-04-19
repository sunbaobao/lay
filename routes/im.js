/**
 * Created by uu on 2017/4/18.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const list = {
    "code": 0,
    "msg": "",
    "data": {
        "mine": {
            "username": "纸飞机",
            "id": "100000",
            "status": "online",
            "sign": "在深邃的编码世界，做一枚轻盈的纸飞机",
            "avatar": "//res.layui.com/images/fly/avatar/00.jpg"
        },
        "friend": [
            {
                "groupname": "知名人物",
                "id": 0,
                "list": [
                    {
                        "username": "贤心",
                        "id": "100001",
                        "avatar": "//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg",
                        "sign": "这些都是测试数据，实际使用请严格按照该格式返回",
                        "status": "online"
                    },
                    {
                        "username": "刘涛tamia",
                        "id": "100001222",
                        "sign": "如约而至，不负姊妹欢乐颂",
                        "avatar": "//tva4.sinaimg.cn/crop.0.1.1125.1125.180/475bb144jw8f9nwebnuhkj20v90vbwh9.jpg"
                    },
                    {
                        "username": "谢楠",
                        "id": "10034001",
                        "avatar": "//tva2.sinaimg.cn/crop.1.0.747.747.180/633f068fjw8f9h040n951j20ku0kr74t.jpg",
                        "sign": ""
                    },
                    {
                        "username": "马小云",
                        "id": "168168",
                        "avatar": "//tva1.sinaimg.cn/crop.0.0.180.180.180/7fde8b93jw1e8qgp5bmzyj2050050aa8.jpg",
                        "sign": "让天下没有难写的代码"
                    },
                    {
                        "username": "徐小峥",
                        "id": "666666",
                        "avatar": "//tva1.sinaimg.cn/crop.0.0.512.512.180/6a4acad5jw8eqi6yaholjj20e80e8t9f.jpg",
                        "sign": "代码在囧途，也要写到底"
                    }
                ]
            },
            {
                "groupname": "网红",
                "id": 1,
                "list": [
                    {
                        "username": "罗玉凤",
                        "id": "121286",
                        "avatar": "//tva4.sinaimg.cn/crop.0.0.640.640.180/4a02849cjw8fc8vn18vktj20hs0hs75v.jpg",
                        "sign": "在自己实力不济的时候，不要去相信什么媒体和记者。他们不是善良的人，有时候候他们的采访对当事人而言就是陷阱"
                    },
                    {
                        "username": "Z_子晴",
                        "id": "108101",
                        "avatar": "//tva1.sinaimg.cn/crop.0.23.1242.1242.180/8693225ajw8fbimjimpjwj20yi0zs77l.jpg",
                        "sign": "微电商达人"
                    },
                    {
                        "username": "大鱼_MsYuyu",
                        "id": "12123454",
                        "avatar": "//tva2.sinaimg.cn/crop.0.0.512.512.180/005LMAegjw8f2bp9qg4mrj30e80e8dg5.jpg",
                        "sign": "我瘋了！這也太準了吧  超級笑點低"
                    },
                    {
                        "username": "Lemon_CC",
                        "id": "102101",
                        "avatar": "//tva4.sinaimg.cn/crop.0.0.180.180.180/6d424ea5jw1e8qgp5bmzyj2050050aa8.jpg",
                        "sign": ""
                    },
                    {
                        "username": "柏雪近在它香",
                        "id": "3435343",
                        "avatar": "//tva2.sinaimg.cn/crop.0.8.751.751.180/961a9be5jw8fczq7q98i7j20kv0lcwfn.jpg",
                        "sign": ""
                    }
                ]
            },
            {
                "groupname": "我心中的女神",
                "id": 2,
                "list": [
                    {
                        "username": "林心如",
                        "id": "76543",
                        "avatar": "//tva3.sinaimg.cn/crop.0.0.512.512.180/48f122e6jw8fcmi072lkyj20e80e8t9i.jpg",
                        "sign": "我爱贤心"
                    },
                    {
                        "username": "佟丽娅",
                        "id": "4803920",
                        "avatar": "//tva3.sinaimg.cn/crop.0.0.750.750.180/5033b6dbjw8etqysyifpkj20ku0kuwfw.jpg",
                        "sign": "我也爱贤心吖吖啊"
                    }
                ]
            }
        ],
        "group": [
            {
                "groupname": "前端群",
                "id": "101",
                "avatar": "//tva1.sinaimg.cn/crop.0.0.200.200.50/006q8Q6bjw8f20zsdem2mj305k05kdfw.jpg"
            },
            {
                "groupname": "Fly社区官方群",
                "id": "102",
                "avatar": "//tva2.sinaimg.cn/crop.0.0.199.199.180/005Zseqhjw1eplix1brxxj305k05kjrf.jpg"
            }
        ]
    }
};
/* GET users listing. */
router.get('/', checkLogin);
router.get('/', function (req, res, next) {
    res.render("demo", {
        title: 'IM',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.get('/getList', function (req, res, next) {
    /*if(!req.session.user){
     req.flash('error',"未登录");
     return res.redirect('/login');
     }
     var user=req.session.user;
     if(!user.avatar){
     user.avatar="//res.layui.com/images/fly/avatar/00.jpg";
     }
     list.data.mine={
     "username": user.username,
     "id": user._id,
     "status": "online",
     "sign": user.sign,
     "avatar":user.avatar
     };
     list.data.friend=user.friend;
     list.data.group=user.group;*/
    res.json(list);
});
router.post("/socketID", function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', "未登录");
        return res.redirect('/login');
    }
    if (!req.body.ID) {
        req.flash('error', "id为空");
        return res.redirect('/');
    }
    var name = req.session.user.username;
    var id = req.body.ID;
    // console.log(name,id);
    User.findOne({username: name}, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            // console.log("find user",user);
            user.socketID = id;
            user.save(function (err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/');
                }
                res.json({
                    code: req.body.ID
                })
            });
        }
    });
    /* res.json({
     code:req.body.ID
     })*/
});
router.post("/sign", function (req, res, next) {
    var name = req.session.user.username;
    User.findOne({username: name}, function (err, user) {
        if (err) handlErr(err, req, res);
        if (!user) {
            req.flash('error', "为遭到user");
            return res.redirect('/');
        }
        console.log(req.body.value);
        user.sign = req.body.value;
        user.save(function (err) {
            console.log("save");
            if (err) {
                res.json({
                    code: "1",
                    message: "存入数据库失败"
                })
            } else {
                res.json({
                    code: "0",
                    message: ""
                })
            }
        })
    })
});
router.post("/find", checkLogin);
router.post("/find", function (req, res, next) {
    if (!req.body.name) {
        req.flash('error', err);
        return res.redirect('/');
    }
    let name = req.body.name;
    let data={code:0,data:[]};
    User.find({username: name}, function (err, users) {
        if(err) return handlErr(err);
        for(let user in users){
            console.log(user);
            data.data.push(
                {name:users[user].username,
                sign:users[user].sign||"",
                avatar:users[user].avatar||"//res.layui.com/images/fly/avatar/00.jpg",
                id:users[user]._id
                }
            )
        }
        res.json(data);
    })
});
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect('/login');
    }
    next();
}
function handlErr(err, req, res) {
    req.flash('error', err);
    return res.redirect('/');
}
module.exports = router;




