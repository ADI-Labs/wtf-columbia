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

		var newMsg = {
    		postID: postIDs,
    		content: msgContent,
    		display: true,
    		score: 0
    	};

		var testPost = $.post('/newPost', newMsg);
		console.log("before");
		displayPost(msgContent);
		postIDs++;       
    });

    $("div#upvote").click(function() {

    })

});


function displayPost(msgContent) {

    $.get('/getPost', { postID: postIDs }, function(data, status){
        console.log(data);
        $("ul#msg-data").append("<li>Content: "
            + data.content + " Score: " + data.score + "</li>");
    });
    
}

