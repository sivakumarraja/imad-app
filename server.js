var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={ 
    'article-one':{
        title:'MY ARTICLE',
        heading: 'NICKY BIRTHDAY',
        date:'JUNE 12, 2014',
        content:`
                <p>
                    The most lovely charm in our family.
                </p>
                <p>
                    He is most adorable kid
                </p>
               `
        },
    'article-two':{
        title:'Article 2',
        heading: 'Saanvika\'s Birthday',
        date:'April 17 2015',
        content:`
                <p>
                    Daring, Dashing, Dynamic Baby girl.
                </p>
        `
    }
};

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
    var htmlTemplate=`
        <html>
            <head>
                <title>
                  ${title}
                </title>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class='container'>
                    <div>
                        <a href='/'>HOME</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date}
                    </div>
                    <div>
                        ${content}
                    </div>
                    
                    <div class="footer">
                        Comments:
                        <br/>
                        <textarea id="comment" rows="4" cols="50"></textarea>
                        <br/>
                        Author: <input type="text" id="author"></input> <br/>
                        <input type="submit" value="submit" id="comment-submit"/>
                        
                        <ul id="comments">
                        </ul>
                    </div>
                    <script type="text/javascript" src="/ui/siva-main.js"></script>
                     
                </div>
            </body>
        </html>
         `;
         return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var comments =[];
app.get('/siva', function(req, res) {
    var comment = req.query.comment;
    var author = req.query.author;
    comments.push(author);
    comments.push(comment);
    res.send(JSON.stringify(comments));
});

var counter = 0;
app.get('/counter', function(req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index-siva.html'));
});

var names = [];
app.get('/submit-name', function(req, res) { // URL: /submit-name?name=xxxxx
    // Get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names)); 
});

app.get('/:articleName',function(req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/siva-main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main-siva.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
