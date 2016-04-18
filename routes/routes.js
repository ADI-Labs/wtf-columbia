var path = require('path');
var bodyParser = require('body-parser');

var Post = require('../scripts/models/post');
var User = require('../scripts/models/User');

module.exports = function (app, passport){
	app.get('/index', function(req, res) {
  		res.render('index.html')
	});

	app.get('/login', function(req, res) {
  		res.render('login.html')
	});

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails

  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('dashboard');
    } else {
      res.render('index'), {
        title: 'wtf-columbia'
      }
    }
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect('/dashboard');
    }
  );

  app.get('/dashboard', function(req, res) {
  	console.log('beginning of dashboard');
    if (!req.isAuthenticated()) {
      res.sendFile(path.join(__dirname, '../public/views/dashboard.html'))
      //res.render('dashboard');
    } else {
      res.redirect('/');
    }
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
    		score: newScore,
    		voted: 0
    	});

    	newMsg.save(function(err) {
    		if (err) throw err;
    		else console.log('Post saved!');
    	});

	});

	app.get('/vote', function(req, res){
		var postID = req.query.postID;
		var vote = req.query.voted;
		var voted = Post.findOne({ postID: req.query.postID}).voted;

		//case upvote
		if (vote == 1 && voted != 1) {
			Post.update({postID: postID},
				{
					$inc: {score: 1},
					voted: 1
				},
				function(err, numAffected){
					if (err) return handleError(err);
				});
			res.status(201);
			res.send('Upvote success');
		} else if (vote == -1 && voted != -1) {
			Post.update({postID: postID},
				{
					$inc: {score: -1},
					voted: -1
				},
				function(err, numAffected){
					if (err) return handleError(err);
				});			
			res.status(201);
			res.send('Downvote success');
		} else {
			res.status(400);
			res.send('Voting failed');
		}
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
		} else {

			Post.findOne({ postID: req.query.postID},
				function(err, post) {
					if (err) return handleError(err);
					getPost = { content: post.content, score: post.score};
					res.send({content: getPost.content, score: getPost.score});
			});
		}
	});
};
