console.log('Loaded 1 !');

// change the text of the main-text div
var element1 = document.getElementById('main-text1'
);
element1. innerHTML = "New Value1";

// Move the image

var img1 = document.getElementById('madi1');
var marginLeft1 = 0;
function moveRight() {
    marginLeft1 = marginLeft1 + 10;
    img.style.marginLeft1 = marginLeft1 + 'px';
    if(marginLeft1 > screen.width )  {
        marginLeft1 = 0;
    }
}

img1.onclick = function (){
    var interval = setInterval(moveRight,50);
    
};
