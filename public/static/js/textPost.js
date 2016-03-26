var postIDs = 1;

$(document).ready(function() {
    console.log("test");
    $("div#form1").append(
        $("<h3/>").text("Submit Post"), $("<form/>", {
        }).append(
            $("<textarea/>", {
                rows: '5px',
                cols: '200px',
                type: 'text',
                id: 'vmsg',
                name: 'msg',
                placeholder: 'Enter Post Here'
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

            $("div#wrap").append("<div class=\"item\" >"
                + "<div class=\"vote-span\">"
                + "<div class=\"vote\" data-action=\"up\" title=\"Vote up\">"
                + "<i class=\"fa fa-chevron-up\"></i></div>"
                + "<div class=\"vote-score\">" + data[x].score + "</div>"
                + "<div class=\"vote\" data-action=\"down\" title=\"Vote down\">"
                + "<i class=\"fa fa-chevron-down\"></i></div></div>"
                + "<div id=\"posts\">"
                + "<div class=\"post\" id=\"postIn\">"
                + "<p>Content: " + data[x].content + " Score: " + data[x].score + "</p></div></div></div>");

                /*
             $("div#wrap").append("<div class=\"post\"> <p>Content: "
                + data[x].content + " Score: " + data[x].score + "</p></div>");
            //displayPost(data[x].postID);
            
            $("ul#msg-data").append("<li>Content: "
                + data[x].content + " Score: " + data[x].score + "</li>");*/
        }
        postIDs = highestPost;
    });
}

function displayPost(pID) {
    console.log(postIDs);
    $.get('/getPost', { postID: pID }, function(data, status){
        console.log(data);
        $("div#wrap").append("<div class=\"item\" >"
                + "<div class=\"vote-span\">"
                + "<div class=\"vote\" data-action=\"up\" title=\"Vote up\">"
                + "<i class=\"fa fa-chevron-up\"></i></div>"
                + "<div class=\"vote-score\">" + data.score + "</div>"
                + "<div class=\"vote\" data-action=\"down\" title=\"Vote down\">"
                + "<i class=\"fa fa-chevron-down\"></i></div></div>"
                + "<div id=\"posts\">"
                + "<div class=\"post\" id=\"postIn\">"
                + "<p>Content: " + data.content + " Score: " + data.score + "</p></div></div></div>");
    });
    
}

