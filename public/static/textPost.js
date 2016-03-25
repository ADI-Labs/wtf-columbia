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

    displayPrevPosts();
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
		displayPost(postIDs);
		postIDs++;       
    });

    $("div#upvote").click(function() {

    })

});

function displayPrevPosts() {
    $.get('/getPost', {}, function(data,status) {
        var highestPost = 0;
        console.log("HELLO");
        console.log(data);
        postIDs = data.postID;
        for (var x = 0; x < data.length; x++) {
            if (data[x].postID >= highestPost) {
                highestPost = data[x].postID + 1;
            }
            //displayPost(data[x].postID);
            $("ul#msg-data").append("<li>Content: "
                + data[x].content + " Score: " + data[x].score + "</li>");
        }
        postIDs = highestPost;
    });
}

function displayPost(pID) {
    console.log(postIDs);
    $.get('/getPost', { postID: pID }, function(data, status){
        console.log(data);
        $("ul#msg-data").append("<li>Content: "
            + data.content + " Score: " + data.score + "</li>");
    });
    
}

