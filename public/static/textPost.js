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
            })/*, $("<br/>"), $("<input/>", {
                type: 'submit',
                id: 'submit',
                value: 'Submit'
            })*/
        )
    )

    $("div#submit-btn").click(function() {
        var msgContent = $("#vmsg").val();
        displayData(msgContent);
    });


});


function displayData(msgContent1) {
    $("ul#msg-data").append("<li style=\"list-style-type: none;\"> Content: " + msgContent1 + "</li>");
}
