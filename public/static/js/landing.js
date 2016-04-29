function login () {
	window.onload = function() {
		//takes user to login page
		$("#login").click(function() {
		    window.location.href = "http://localhost:3000/auth/google";
		});
	}
}

login();
