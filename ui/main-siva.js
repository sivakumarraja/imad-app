//submit name
var submit = document.getElementById('comment-submit');
alert('oo');
submit.onclick = function () {
    
    alert('llll');
    // Creat a request object
    var request = new XMLHttpRequest();
    
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if(request.status === 200) {
                // capture a list of names and render it as a list
                 var comments = request.responseText;
                comments =JSON.parse(comments);
                var list = '';
                for (var i= comments.length-1; i>=0; i--) {
                    list += '<span>' + comments[i] + '</span>';
                }
                var ul = document.getElementById('comments');
                ul.innerHTML = list;
            }
        }
        // Not done yet
    };
    
    // Make the request
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET','http://sivakumarraja.imad.hasura-app.io/article-one', true);
    request.send(null);
    
};