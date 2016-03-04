// grab the user model
var User = require('./User');

var create = function create_user(){
	// create a new user
	var newUser = User({
		name: "Maria",
		email_id: "maria.gmail",
		username: "mariacasciani",
		password: "blah",
		admin: true,
		post_id: [22]
	});
	// save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  console.log('User created!');
	});
}

module.exports = create;