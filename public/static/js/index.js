$("body").css('background-color', '');

$(document).ready(function(){
	$("div#signup").click( function() {
	//gets the inputted values
	console.log("here");
	var username = $("#name").val();
	var email = $("#email_id").val();
	var password = $("#password").val();

	var newUser = {
		username : username,
		email : email,
		password: password
	}

	//creates new user
	$.post('/new_user', newUser);
	});
});

