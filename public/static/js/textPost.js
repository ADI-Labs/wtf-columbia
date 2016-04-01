var postIDs = 1;


$(document).ready(function() {
    $("div#form1").append(
        $("<h3/>").text("Submit Post"), $("<form/>", {
        }).append(
            $("<textarea/>", {
                rows: '5px',
                width: '100%',
                type: 'text',
                id: 'vmsg',
                name: 'msg',
                placeholder: 'Enter Post Here'
            })
        )
    );


    displayPrevPosts();

    $('.vote').click(function() {
        console.log("here");
        /*var idValue = $(this).attr('id');
        
        var postID = document.getElementById("upvote").dataset.id;
        $.get('/upvote', {postID: postID}, function(data, status) {
            console.log(data);
        });*/

    });

    $("div#submit-btn").click(function() {

        var msgContent = $("#vmsg").val();

        var newMsg = {
            postID: postIDs,
            content: msgContent,
            display: true,
            score: 0
        };


        var testPost = $.post('/newPost', newMsg);
        displayPost(postIDs);
        postIDs++;       
    });

});

$(document).on('click', ".fa.fa-chevron-up", function() {
    var postID = $(this).attr('data-id');
    var hasUpvoted = $(this).attr('data-b') === "true";
    var hasDownvoted = $("#d" + postID).attr('data-b') === "true"; 
    console.log(hasUpvoted);
    console.log(hasDownvoted);
    if (!hasUpvoted) {
        if (hasDownvoted) {
            var score = Number($(this).attr('data-score')) + 2;
            $.get('/upvote', {postID: postID}, function(data, status) {});
            $.get('/upvote', {postID: postID}, function(data, status) {}); 
            console.log($("i#d" + postID));
            $("i#d" + postID).replaceWith("<i id=\"d " + postID + "\" data-b = \"false\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "></i></div></div>");   
            $(this).replaceWith("<i id=\"u" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "\" style=\"color:#0F0\"></i></div></div>");
        
        } else {
            var score = Number($(this).attr('data-score')) + 1;
            $.get('/upvote', {postID: postID}, function(data, status) {});
            $(this).replaceWith("<i id=\"u" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "\" style=\"color:#0F0\"></i></div></div>");
        }
        
        $("div#" + postID).replaceWith("<div class=\"vote-score\" id=\"" + postID + "\">" + score + "</div>");  
    }
});

$(document).on('click', ".fa.fa-chevron-down", function() {
    var postID = $(this).attr('data-id');
    var ele = $("#u" + postID);
    var hasUpvoted = ele.attr('data-b') === "true";
    var hasDownvoted = $(this).attr('data-b') === "true";
    console.log(hasUpvoted);
    console.log(hasDownvoted);
    console.log($(this));
    if (!hasDownvoted) {
        if (hasUpvoted) {
            var score = Number($(this).attr('data-score')) - 2;
            $.get('/downvote', {postID: postID}, function(data, status) {});
            $.get('/downvote', {postID: postID}, function(data, status) {}); 
            console.log($("i#u" + postID));
            $(this).next().html("<i id=\"u" + postID + "\" data-b = \"false\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "></i></div></div>");   
            $(this).replaceWith("<i id=\"d" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#F00\"></i></div></div>");
        
        } else {
            var score = Number($(this).attr('data-score')) - 1;
            $.get('/downvote', {postID: postID}, function(data, status) {});
            $(this).replaceWith("<i id=\"d" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#F00\"></i></div></div>");
        }
        
        $("div#" + postID).replaceWith("<div class=\"vote-score\" id=\"" + postID + "\">" + score + "</div>");  
    }
})


function displayPrevPosts() {
    $.get('/getPost', {}, function(data,status) {
        var highestPost = 0;
        console.log(data);
        postIDs = data.postID;
        for (var x = 0; x < data.length; x++) {
            if (data[x].postID >= highestPost) {
                highestPost = data[x].postID + 1;
            }

            $("div#wrap").append("<div class=\"item\" >"
                + "<div class=\"vote-span\">"
                + "<div class=\"vote\" id=\"upvote\" data-action=\"up\" title=\"Vote up\">"
                + "<i id=\"u" + data[x].postID + "\" data-b=\"false\" class=\"fa fa-chevron-up\" data-score=\"" + data[x].score + "\" data-id=\"" + data[x].postID + "\"></i></div>"
                + "<div class=\"vote-score\" id=\"" + data[x].postID + "\">" + data[x].score + "</div>"
                + "<div class=\"vote\" id=\"downvote\"  data-action=\"down\" title=\"Vote down\">"
                + "<i id=\"d" + data[x].postID + "\" data-b=\"false\" class=\"fa fa-chevron-down\" data-score=\"" + data[x].score + "\" data-id=\"" + data[x].postID + "\"></i></div></div>"
                + "<div id=\"posts\">"
                + "<div class=\"post\" id=\"postIn\">"
                + "<p>" + data[x].content + " Score: " + data[x].score + "</p></div></div></div>");
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
                + "<div class=\"vote\" id=\"upvote\" data-id=\"" + pID + "\" data-action=\"up\" title=\"Vote up\">"
                + "<i class=\"fa fa-chevron-up\"></i></div>"
                + "<div class=\"vote-score\">" + data[x].score + "</div>"
                + "<div class=\"vote\" id=\"downvote\" data-id=\"" + data[x].postID + "\" data-action=\"down\" title=\"Vote down\">"
                + "<i class=\"fa fa-chevron-down\"></i></div></div>"
                + "<div id=\"posts\">"
                + "<div class=\"post\" id=\"postIn\">"
                + "<p>" + data[x].content + " Score: " + data[x].score + "</p></div></div></div>");

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

