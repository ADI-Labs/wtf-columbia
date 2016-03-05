
var path = require('path');
var bodyParser = require('body-parser');

var Post = require('../scripts/post');

module.exports = function (app){
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
	
	app.get('/', function (req, res) {
		res.render('basicUI', {title : "Hello World"})
	});

	app.get('/basicUI', function(req, res) {
  		res.sendFile(path.join(__dirname, '../public/views/basicUI.html'))
	});

	app.post('/newPost', function(req, res){
		console.log('POST /');
		console.dir(req.body);

		//res.writeHead(200, {'Content-Type: 'application/json'});
		var newPostID = req.body.postID;
		var newContent = req.body.content;
		var newDisplay = req.body.display;
		var newScore = req.body.score;

		var newMsg = new Post({
    		postID: newPostID,
    		content: newContent,
    		display: newDisplay,
    		score: newScore
    	});

    	newMsg.save(function(err) {
    		if (err) throw err;
    		console.log('User saved!');
    	});
	});
}
