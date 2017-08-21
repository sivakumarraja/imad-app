console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "New Text added in client-side Java Script";

//Move the image
var img = document.getElementById('madi');

img.onClick = function () {
    img.style.marginLeft = '100px';
};