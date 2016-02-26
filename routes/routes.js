module.exports = function (app){
	app.get('/', function (req, res) {
		res.render('index', {title : "Hello World"})
	})
}

 // routing for landing page
	//app.get('/', function(req, res) {
 // res.sendFile(__dirname + '/views/landing.html');
//});
