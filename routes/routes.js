
var path = require('path');

module.exports = function (app){
	
	
	app.get('/', function (req, res) {
		res.render('index', {title : "Hello World"})
	});

	app.get('/basicUI', function(req, res) {
  		res.sendFile(path.join(__dirname, '../public/views/basicUI.html'))
	});

}