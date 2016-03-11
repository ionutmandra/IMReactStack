"use strict";
// nodemon server.js
// require("babel-core/register");

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var config = require('./server/config');
var authMod = require('./server/authentication');
var authCheck = require('./server/authenticationCheck');
var bodyParser  = require('body-parser');

var router = express.Router();

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

authMod.configureAuth(app, router);

//middleware must be defined before routes
router.use(function(req, res, next) {   
	next(); 
});

var custRoutes = require('./server/custom_routes.js');
custRoutes.init(__dirname);
custRoutes.setPageRoutes(router);
custRoutes.setApiRoutes(router);
custRoutes.setFileRoutes(app);

//routes defined after this midleware is set will be validated against jwt token
authCheck.configure(app, router);
router.get('/api/editMembers', function(req, res) {		

	console.log('protected api');

		var initialState = {
			generalInfo:{description: 'fuisabfiusabfasui'},
			members:[ 
			{name:'ionut',email:'ionut@ionut.com',id:1}, 
			{name:'tudrel',email:'tudrel@tudrel.com',id:2},
			{name:'marusica',email:'marusciac@tudrel.com',id:3}]};

			res.json(initialState);		
});


app.use('/', router);

app.listen(port);
console.log('listeninng on port... ' + port );
