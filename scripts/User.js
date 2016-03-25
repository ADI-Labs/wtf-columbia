var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
	username: { type: String, required: true, unique: true},
	email_id: { type: String, required: true, unique: true},
	password: {type: String, required: true},
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

// userSchema.pre('save', function(next) 
// {
//   // get the current date
//   var currentDate = new Date();
  
//   // change the updated_at field to current date
//   this.updated_at = currentDate;

//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;

//   next();
// });

// userSchema.methods.updatedDate = function(int postID){
	

// 	return post_id;
// };




var User = mongoose.model('User', userSchema);

module.exports = User;