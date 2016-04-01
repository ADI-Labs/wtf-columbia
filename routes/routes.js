
var path = require('path');
var bodyParser = require('body-parser');

var Post = require('../scripts/post');
var User = require('../scripts/User');

module.exports = function (app){
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
	
	app.get('/', function (req, res) {
		res.render('basicUI', {title : "Hello World"})
	});

	app.get('/basicUI', function(req, res) {
  		res.sendFile(path.join(__dirname, '../public/views/basicUI.html'))
	});

	app.get('/index', function(req, res) {
  		res.sendFile(path.join(__dirname, '../public/views/index.html'))
	});

	app.post('/new_user', function(req,res) {
		console.log('POST/');

		// save the user
		var newUser = new User({
			username: req.body.username,
			email_id: req.body.email,
			password: req.body.password
    	});

		newUser.save(function(err) {
		  if (err) throw err;
		  console.log('User created!');
		});
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
    		else console.log('Post saved!');
    	});

	});

	app.get('/upvote', function(req, res){

		var postID = req.query.postID;		
		Post.update({postID: postID},
			{$inc: {score: 1}},
			function(err, numAffected){
				if (err) return handleError(err);
			});
	});

	app.get('/downvote', function(req,res){
		var postID = req.query.postID;		
		Post.update({postID: postID},
			{$inc: {score: -1}},
			function(err, numAffected){
				if (err) return handleError(err);
			});
	});

	app.get('/getPost', function(req, res) {
		//console.log('GET /');
		if (req.query.postID == null) {
			
			Post.find({}, function(err, posts) {
				if (err) return handleError(err);
				if (posts == null) {
					console.log("HELLO");
					res.send(0);
				} else {
					//console.log(posts);
					res.send(posts);	
				}
				//res.send(posts);
			});

			/*
			if (post.postID == null) {
				res.send(0);
			} else {
				res.send(post.postID);
			}
			Post.findOne({}, {}, {sort: {'postID' : -1}}, function(err, post){
				
				
			});*/
			//console.log(posts);
		} else {
			
			Post.findOne({ postID: req.query.postID},
				function(err, post) {
					if (err) return handleError(err);
					getPost = { content: post.content, score: post.score};
					res.send({content: getPost.content, score: getPost.score});
			});
	
		}
		
	});
}
