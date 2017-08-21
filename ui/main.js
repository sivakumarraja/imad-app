console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "New Text added in client-side Java Script";

//Move the image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onClick = function () {
    alert('Click');
    var interval = setInterval(moveRight,50);
};