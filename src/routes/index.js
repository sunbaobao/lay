const express = require('express');
const router = express.Router();
const crypto = require('crypto');
import User from '../models/user.js';

const Post = require('../models/post.js');
const jwt = require("../middlewares/jwt");
import users from "./users";
import api from './api';
import log from './log';
import fileUpload from './fileUpload';
const tools = function (req, res) {
    return {
        setJson: function (code, message, data) {
            return res.json({
                meta: {
                    code: code || 0,
                    message: message || null
                },
                data: data || null,
                code: code || 20000,
                message: message || null
            });
        }
    };

};
router.use(function (req, res, next) {
    res.tools = new tools(req, res);
    res.jwt = jwt;
    next();
});
router.get('/', function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) {
            posts = [];
        }
        // console.log(posts);
        res.render('index', {
            title: 'WEBIM',
            user: req.session.user,
            posts: posts,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});
const list = {
    "friend": [
        {
            "groupname": "知名人物",
            "id": 0,
            "list": []
        },
        {
            "groupname": "网红",
            "id": 1,
            "list": []
        },
        {
            "groupname": "我心中的女神",
            "id": 2,
            "list": []
        }
    ]
};
router.post('/reg', function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    let password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg');//返回注册页
    }
    hashPasswordAsync(password).then(function (data) {
        //生成密码的 md5 值
        /*let md5 = crypto.createHash('md5'),
         password1 = md5.update(req.body.password).digest('hex');*/
        let newUser = new User({
            username: name,
            password: data.password,
            email: req.body.email,
            salt: data.salt,
            friend: list.friend,
            group: []
        });
        //检查用户名是否已经存在
        User.findOne({username: newUser.username}, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            if (user) {
                console.log(user);
                req.flash('error', '用户已存在!');
                return res.redirect('/reg');//返回注册页
            }
            //如果不存在则新增用户
            newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg');//注册失败返回主册页
                }
                req.session.user = newUser;//用户信息存入 session
                req.flash('success', '注册成功!');
                res.redirect('/');//注册成功后返回主页
            });
        });

    }, function (err) {
        req.flash('error', err);
        return res.redirect('/');
    });
});
router.get('/reg', function (req, res) {
    res.render('reg', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/login', function (req, res) {
    //生成密码的 md5 值
    /* let md5 = crypto.createHash('md5'),
     password = md5.update(req.body.password).digest('hex');*/
    //检查用户是否存在
    User.findOne({username: req.body.name}, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login');//用户不存在则跳转到登录页
        }
        // let password=hashPassword(req.body.password).password;
       if(user.comparePassword(req.body.password)){
           //用户名密码都匹配后，将用户信息存入 session
           req.session.user = user;
           req.flash('success', '登陆成功!');
           res.jwt.setToken(user.id);
           res.redirect('/');//登陆成功后跳转到主页
       }else{
           req.flash('error', '密码错误!');
           return res.redirect('/login');//密码错误则跳转到登录页
       }
        // bcrypt.hash(req.body.password, user.salt, null, function (err, hash) {
        //     if (err) throw err;
        //     //检查密码是否一致
        //     if (user.password != hash) {
        //         req.flash('error', '密码错误!');
        //         return res.redirect('/login');//密码错误则跳转到登录页
        //     }
        //
        // });
    });
});
router.get('/login', function (req, res) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/');//登出成功后跳转到主页
});
router.get('/post', function (req, res) {
    res.render('post', {
        title: '发表',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/post', function (req, res) {
    let currentUser = req.session.user;
    let date = new Date();
    /*let time = {
     date: date,
     year: date.getFullYear(),
     month: date.getFullYear() + "-" + (date.getMonth() + 1),
     day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
     minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
     date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes():date.getMinutes())
     };*/
    let post = new Post({name: currentUser.username, time: date, title: req.body.title, post: req.body.post});
    post.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功!');
        res.redirect('/');//发表成功跳转到主页
    });
});
router.post('/bdApi/FaceDetect', function (req, res) {
    res.json({
        code: "1",
        message: "还没放成"
    });
});
router.use('/user', users);
router.use('/api', api);
router.use('/log', log);
router.use('/fileUpload',fileUpload);
module.exports = router;

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        res.redirect('back');//返回之前的页面
    }
    next();
}

// 创造加盐的密码
function hashPasswordAsync(pas) {
    return new Promise(function (resolve, reject) {
        resolve({
            password: crypto.createHash('md5').update(pas).digest('hex')

        });
    });

}
