console.log('Loaded 1 !');

// change the text of the main-text div
var element = document.getElementById('main-text1'
);
element. innerHTML = "New Value1";

// Move the image

var img = document.getElementById('madi1');
var marginLeft = 0;

alert(img.id);

function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
    if(marginLeft > screen.width )  {
        marginLeft = 0;
    }
}


img.onClick = function ()
{
    alert('hello..');
    var interval = setInterval(moveRight,50);
};

