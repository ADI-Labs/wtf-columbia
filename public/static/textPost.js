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
		var testPost = $.post('/newPost', JSON.stringify(newMsg));       
    });
    $("div#upvote").click(function() {
    })
});


function displayData() {

}

