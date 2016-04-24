var postIDs = 1;


$(document).ready(function() {
    

    $("div#logout").click(function() {
        $.get('/logout');
    });



/*
    $("div#form1").append(
        $("<h3/>").text("Submit Post"), $("<form/>", {}).append(
            $("<textarea/>", {
                rows: '5px',
                width: '100%',
                type: 'text',
                id: 'vmsg',
                name: 'msg',
                placeholder: 'Enter Post Here'
            })
        )
    );*/

    displayPrevPosts();
    
   

    $("a#submit-btn").click(function() {
        var msgContent = $("#vmsg").val();
        var newMsg = {
            postID: postIDs,
            content: msgContent,
            display: true,
            score: 0
        };

        $.post('/newPost', newMsg);
        displayPost(postIDs);
        $("#lean_overlay").trigger("click");
        postIDs++;
    });

    $("#modal_trigger").leanModal({
        top : 200,
        overlay : 0.6,
        closeButton: ".modal_close",
    });

    // Calling Login Form
    $("#login_form").click(function () {
        $(".social_login").hide();
        $(".user_login").show();
        return false;
    });

// Calling Register Form
    $("#register_form").click(function () {
        $(".social_login").hide();
        $(".user_register").show();
        $(".header_title").text('Register');
        return false;
    });

    // Going back to Social Forms
    $(".back_btn").click(function () {
        $(".user_login").hide();
        $(".user_register").hide();
        $(".social_login").show();
        $(".header_title").text('Login');
        return false;
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
            
            //Increment score client side
            var score = Number($(this).attr('data-score')) + 1;
            
            //Increment score server side
            $.get('/upvote', {
                postID: postID
            }, function(data, status) {});
            $.get('/upvote', {
                postID: postID
            }, function(data, status) {});
            
            console.log($("i#d" + postID));
            $("i#d" + postID).replaceWith("<i id=\"d " + postID + "\" data-b = \"false\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#000\"></i></div></div>");
            $(this).replaceWith("<i id=\"u" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "\" style=\"color:#0F0\"></i></div></div>");

        } else {
            var score = Number($(this).attr('data-score')) + 1;
            $.get('/upvote', {
                postID: postID
            }, function(data, status) {});
            $(this).replaceWith("<i id=\"u" + postID + "\" data-b =     \"true\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "\" style=\"color:#0F0\"></i></div></div>");
        }

        $("div#" + postID).replaceWith("<div class=\"vote-score\" id=\"" + postID + "\">" + score + "</div>");
    }
});

$(document).on('click', ".fa.fa-chevron-down", function() {
    var postID = $(this).attr('data-id');
    var ele = $("#u" + postID);
    var hasUpvoted = $("#u" + postID).attr('data-b') === "true";
    var hasDownvoted = $(this).attr('data-b') === "true";
    console.log(hasUpvoted);
    console.log(hasDownvoted);
    console.log($(this));
    if (!hasDownvoted) {
        if (hasUpvoted) {
            var score = Number($(this).attr('data-score')) - 1;
            $.get('/downvote', {
                postID: postID
            }, function(data, status) {});
            $.get('/downvote', {
                postID: postID
            }, function(data, status) {});
            console.log($("i#u" + postID));
            $("i#u" + postID).replaceWith("<i id=\"u" + postID + "\" data-b = \"false\" class=\"fa fa-chevron-up\" data-id=\"" + postID + "\" style=\"color:#000\"></i></div></div>");
            $(this).replaceWith("<i id=\"d" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#F00\"></i></div></div>");

        } else {
            var score = Number($(this).attr('data-score')) - 1;
            $.get('/downvote', {
                postID: postID
            }, function(data, status) {});
            $(this).replaceWith("<i id=\"d" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#F00\"></i></div></div>");
        }

        $("div#" + postID).replaceWith("<div class=\"vote-score\" id=\"" + postID + "\">" + score + "</div>");
    }
})
/*
function updateArrows(isUp, postID) {
    var startChar;
    if (isUp) {
        startChar = "u";
    } else {
        startChar = "d";
    }
    var html = [
        '<div class="vote-score" id="' + 
    ].join("\n");

    <i id=\"d" + postID + "\" data-b = \"true\" class=\"fa fa-chevron-down\" data-id=\"" + postID + "\" style=\"color:#F00\"></i></div></div>
}*/

function appendPost(data) {
    var html = [
        '<div class ="item">',
            '<div class="vote-span">',
                '<div class="vote" id="upvote" data-action="up" title="Vote up">',
                    '<i id="u' + data.postID + '" data-b="false" class="fa fa-chevron-up" data-score="' + data.score + '" data-id="' + data.postID + '"></i>',
                '</div>',
                '<div class="vote-score" id="' + data.postID + '">',
                    data.score,
                '</div>',
                '<div class="vote" id="downvote"  data-action="down" title="Vote down">',
                    '<i id="d' + data.postID + '" data-b="false" class="fa fa-chevron-down" data-score="' + data.score + '" data-id="' + data.postID + '"></i>',
                '</div>',
            '</div>',
        '<div id="posts">',
            '<div class="post" id="postIn">',
                '<p>',
                    data.content,
                '</p>',
            '</div>',
        '</div>'                                            
    ].join("\n");

    $("div#wrap").append(html);

}

function displayPrevPosts() {
    $.get('/getPost', {}, function(data, status) {
        var highestPost = 0;
        console.log(data);
        postIDs = data.length;
        for (var x = 0; x < data.length; x++) {
            appendPost(data[x]);
        }
    });
}

function displayPost(pID) {
    console.log(postIDs);
    $.get('/getPost', {
        postID: pID
    }, function(data, status) {
        console.log(data);
        appendPost(data);
    });
}