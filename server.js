var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'sivakumarraja',
    database: 'sivakumarraja',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

/*var articles={ 
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
};*/

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
                        ${date.toDateString()}
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

function hash (input, salt) {
    // How to create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    //return hashed.toString('hex');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    
    //algorithm: md5
    //"password" -> jdy76832v2dkljfy33unrbhjguur                gives fixed hash value.
    //"password-this-is-some-random-string' -> always gives different value when added a salt value. creates as 
    //              <hash> <hash>...10000 times
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
})

//app.get('/create-user', function(req, res) {
app.post('/create-user', function(req, res) {
    // username, password
    // {"username": "siva:=", "password": "password"}
    //JSON Request
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.getRandomBytes(128).toString("hex");
    var dbString = hash(passowrd, salt);
    
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created: ' + username);
        }
    });
})

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select request
    //return a response with results
    pool.query('SELECT * FROM TEST', function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            // res.send(JSON.stringify(result));
            res.send(JSON.stringify(result.rows));
        }
    });
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

app.get('/articles/:articleName',function(req, res) {
    // var articleName = req.params.articleName;
    
    // SELECT * FROM article WHERE title - one
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0) {
                res.status(404).send('Article not found');
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
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
