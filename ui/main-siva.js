//submit name
var submit = document.getElementById('comment-submit');
submit.onclick = function () {
    
    // Creat a request object
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if(request.status === 200) {
                // capture a list of names and render it as a list
                 var comments = request.responseText;
                 alert(comments);
                comments =JSON.parse(comments);
                alert(comments);
                var list = '';
                for (var i = 0; i >= comments.length-1; i=i+2) {
                    list += '<span><b>' + comments[i] + '</b> says: ' + comments[i+1] + '</span><br/>';
                }
                var commentslist = document.getElementById('comments');
                commentslist.innerHTML = list;
            }
        }
        // Not done yet
    };
    
    // Make the request
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    var authorInput = document.getElementById('author');
    var author = authorInput.value;
    commentInput.value='';
    authorInput.value='';
    request.open('GET','http://sivakumarraja.imad.hasura-app.io/siva?comment=' + comment +'&author=' + author, true);
    request.send(null);
    
};