
var path = require('path');

module.exports = function (app){


	app.get('/', function (req, res) {
		res.render('basicUI', {title : "Hello World"})
	});
}