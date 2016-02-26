var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var path = require('path');
var http = require('http'),
    fs = require('fs');


var router = express.Router();

//middleware defined before routes
router.use(function(req, res, next) {   
    console.log(req.method, req.url);
    next(); 
});

router.get('/', function(req, res) {
    fs.readFile("../index.html", 'utf-8', function (error, data) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
});

router.get('/about', function(req, res) {
    res.send('im the about page2!'); 
});

router.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});

router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});

app.use('/dist', express.static(path.join(__dirname + '/dist')));
app.use('/css', express.static(path.join(__dirname + '/css')));

app.use('/', router);

app.listen(port);
