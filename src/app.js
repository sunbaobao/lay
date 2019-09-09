const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes/index');
const im = require("./routes/im");
const settings = require('../settings');
// const users = require('./routes/users');
// import users from "../"
const common = require("./routes/common");
const jwt = require("express-jwt");
import jwtauth from "./middlewares/jwtAuth";

const app = express();
const auth = new jwtauth();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join('./public')));
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        /* db: settings.db,
         host: settings.host,
         port: settings.port,*/
        url: 'mongodb://client:150sun@localhost/blog'
    }),
    resave: false,
    saveUninitialized: true
}));
/*app.use((req, res, next) => {
    if (req.path.indexOf('/api') === -1) {
        return res.render('index')
    }
    return next()
});*/

app.use(/^(\/user\/(?!sign\/up|sign\/in)|\/api).+$/,
    jwt({
    secret: settings.secret,
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}));
app.use('/', routes);
// app.use('/users', users);
app.use('/im', im);
app.use('/common', common);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
