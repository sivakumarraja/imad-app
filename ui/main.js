console.log('Loaded!');

// change the text of the main-text div
var element = document.getElementById('main-text'
);
element. innerHTML = "New Value";

// Move the image

var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
    screen.height + "</p>";
img += "<p>Available width/height: " + screen.availWidth + "*" + screen.availHeight + "</p>";
}
img.onclick = function (){
    var interval = setInterval(moveRight,100);
    
};
