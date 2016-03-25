var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({ 
	postID: Number,
	content: String,
	display: Boolean,
	score: Number
});

postSchema.methods.upvote = function() {
	this.score++;
	return this.score;
};

postSchema.methods.downvote = function() {
	this.score--;
	return this.score;
}

var Post = mongoose.model('Post', postSchema);

module.exports = Post;