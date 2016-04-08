var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema ({
	username: { type: String, required: true, unique: true},
	email_id: { type: String, required: true, unique: true},
	//password: {type: String, required: true},
	admin: Boolean,
	// created_at: Date,
	// updated_at: Date,
	post_id: Array
})

userSchema.methods.makeAdmin = function()
{
	this.admin = true;

	return this.admin;
};

userSchema.methods.addPostId = function(postID)
{
	post_id.push(postID);
	return post_id;
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
