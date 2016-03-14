
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
    		else console.log('User saved!');
    	});

	});

	app.get('/getPost', function(req, res) {
		if (req.query.postID == null) {
			Post.findOne({}, {}, {sort: {'created_at' : -1}}, function(err, post){
				res.send(post.postID);
			});
			console.log("null");
		} else {
			console.log('GET /');
			Post.findOne({ postID: req.query.postID},
				function(err, post) {
					if (err) return handleError(err);
					getPost = { content: post.content, score: post.score};
					res.send({content: getPost.content, score: getPost.score});
			})
	
		}
		
	});
}
