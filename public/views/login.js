$("body").css('background-color', '');

$(document).ready(function(){
	$("div#login").click( function() {
		//gets the inputted values
		var username = $("#name").val();
		var password = $("#password").val();

		var User = {
			username : username,
			password: password
		}

		//creates new user
		$.get('/get_login', User);
	});
});

