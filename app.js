var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var session = require("express-session");

var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Account = require('./scripts/User');
//var favicon = require('serve-favicon');

var config = require('./config/config')
var mongoose = require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//sets up connection to mongodb data base for user logins
mongoose.connect('mongodb://wtfcuuser:wtfcu@ds019628.mlab.com:19628/wtfcu');

//view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));  //logs every request to console 
app.use(bodyParser.json()); //get info from HTML  forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // reads cookies --> needed for authentication
app.use(session({     
	secret: 'cookiezcookiezcookiez',
    name: 'this_cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

//passport configuration=========================================
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public/static')));
app.use(flash());

require('./scripts/auth/authenticate')(config.googleAuth, passport);


//routes=========================================================
require('./routes/routes')(app, passport);

server.listen(config.port);
console.log("*****************************");
console.log("* App running at port: " + config.port + " *");
console.log("*****************************");

