// Counter code
var button = document.getElementById("counter");

button.onclick = function () {
    
    // Creat a request object
    var request = new XMLHttpRequest();
    
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        // Not done yet
    };
    
    // Make the request
    request.open('GET','http://sivakumarraja.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

//submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    // Creat a request object
    var request = new XMLHttpRequest();
    
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if(request.status === 200) {
                // capture a list of names and render it as a list
                 var names = request.responseText;
                names =JSON.parse(names);
                var list = '';
                for (var i=0; i< names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        // Not done yet
    };
    
    // Make the request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://sivakumarraja.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
};

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
    request.open('GET','http://sivakumarraja.imad.hasura-app.io/:articleName', true);
    request.send(null);
    
};
