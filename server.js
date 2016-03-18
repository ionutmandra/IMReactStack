"use strict";
// nodemon server.js

//node modules
var express = require('express');
var bodyParser  = require('body-parser');

//cust modules
var config 	= require('./server/config');
var login 	= require('./server/routesLogin');
var authCheck = require('./server/authenticationCheck');

//vars
var app     = express();
var router  = express.Router();
var port    = process.env.PORT || 8080;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

login.setLoginRoutes(app, router);

var routes = require('./server/routesCustom.js').init(__dirname);

routes.setPageRoutes(router);
routes.setApiRoutes(router);
routes.setFileRoutes(app);

//routes defined after this midleware will check roles/rights
authCheck.configure(app, router);

routes.setAdminRoutes(router);

app.use('/', router);

app.listen(port);
console.log('listeninng on port... ' + port );