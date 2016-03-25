var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);

var config = require('./config/config')
var mongoose = require('mongoose');
//sets up connection to mongodb data base for user logins
mongoose.connect('mongodb://wtfcuuser:wtfcu@ds019628.mlab.com:19628/wtfcu');

var newUser = require('./scripts/create_user');

server.listen(config.port);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public/static')));

require('./routes/routes')(app)

console.log("*****************************");
console.log("* App running at port: " + config.port + " *");
console.log("*****************************");

