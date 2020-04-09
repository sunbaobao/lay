
const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
/* GET users listing. */
const Post=require("../models/post")
router.get('/captcha', function (req, res, next) {
    let captcha = svgCaptcha.create();
    req.session.code = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});
router.get('/post1',function (req, res, next) {
  Post.find({},function (err, doc) {

      if(!err){
          res.json({
              code:"1",
              data:doc
          })
      }else {
          res.json({
              code:"0",
              data:err
          })
      }
  })
});
module.exports = router;
