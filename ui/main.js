console.log('Loaded!');

// change the text of the main-text div
var element = document.getElementById('main-text'
);
element. innerHTML = "New Value";

// Move the image

var img = document.getElementById('madi');
var marginLeft = 0;
var marginRight = 1;
function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
    if(marginLeft > 600){
        marginLeft = 0
    }
}
img.onclick = function (){
    var interval = setInterval(moveRight,100);
    
};
