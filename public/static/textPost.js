var postIDs = 1;

$(document).ready(function() {
    console.log("test");
    $("div#form1").append(
        $("<h3/>").text("Submit Post"), $("<p/>").text("Fill out the form"), $("<form/>", {
            
        }).append(
            $("<textarea/>", {
                rows: '5px',
                cols: '27px',
                type: 'text',
                id: 'vmsg',
                name: 'msg',
                placeholder: 'Message'
            })
        )
    )

    $("div#submit-btn").click(function() {

    	var msgContent = $("#vmsg").val();

		var newMsg = JSON.stringify({
    		postID: postIDs,
    		content: msgContent,
    		display: true,
    		score: 0
    	});

		//var http = require("http");

		var testPost = $.post('/newUser', JSON.stringify(newMsg));
/*
		var options = {
			hostname: '127.0.0.1',
			port: 80,  
			path: '/newUser',  
			method: 'POST',  
			headers: {'Content-Type': 'application/json'}
		};

		var req = http.request(options, function(res) {
			console.log('Status: ' + res.statusCode);  
			console.log('Headers: ' + JSON.stringify(res.headers));  
			res.setEncoding('utf8');  
			res.on('data', function (body) {    
				console.log('Body: ' + body);  
			});
		});

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});// write data to request body
		req.write(newMsg);
		req.end(); */        
    });

    $("div#upvote").click(function() {
    	
    })

});


function displayData() {
/*
	var getPost = Post.find({ postID : postIDs }, function(err, user) {
		if (err) throw err;

		console.log(user);
	});

	$("ul#msg-data").append("<li" + getPost.postID + " style=\"list-style-type: none;\"> Content: "
    	+ getPost.content + " Score: " + getPost.score 
    	+ "<div id=\"upvote\"> UPVOTE </div>"
    	+ "<div id=\"downvote\"> DOWNVOTE </div>" + "</li>");*/
}

