/**
 * Created by uu on 2017/4/18.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
   res.render("demo",{});
});

module.exports = router;
