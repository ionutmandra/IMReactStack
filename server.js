"use strict";
// nodemon server.js
// require("babel-core/register");

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

console.log('starting server...');

var router = express.Router();

//middleware must be defined before routes
router.use(function(req, res, next) {   
    console.log(req.method, req.url);
    next(); 
});

var custRoutes = require('./server/custom_routes.js');
custRoutes.init(__dirname);
custRoutes.setPageRoutes(router);
custRoutes.setApiRoutes(router);
custRoutes.setFileRoutes(app);

app.use('/', router);

app.listen(port);
console.log('listeninng on port... ' + port );
