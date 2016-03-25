// grab the user model
var User = require('./User');

var create = function create_user(username, email, password){
	// create a new user
	var newUser = User({
		username: username,
		email_id: email,
		password: password,
		admin: false,
		post_id: [22]
	});
	// save the user
	newUser.save(function(err) {
	  if (err) throw err;
	});
}

module.exports = create;