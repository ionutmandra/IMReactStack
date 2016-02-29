//nodemon server.js

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var path = require('path');
var http = require('http'),
    fs = require('fs');

console.log('starting server...');

var router = express.Router();

//middleware must be defined before routes
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

router.get('/api/members', function(req, res) {

    var initialState = {
            generalInfo:{description: 'fuisabfiusabfasui'},
            members:[ 
                        {name:'ionut',email:'ionut@ionut.com',id:1}, 
                        {name:'tudrel',email:'tudrel@tudrel.com',id:2},
                        {name:'marusica',email:'marusciac@tudrel.com',id:3}]};

    res.json(initialState);
});

router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});

app.use('/dist', express.static(path.join(__dirname + '/dist')));
app.use('/css', express.static(path.join(__dirname + '/css')));

app.use('/', router);

app.listen(port);
console.log('listeninng on port... ' + port );