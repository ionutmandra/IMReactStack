'use strict';
// nodemon server.js

//node modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

//cust modules
var config = require('./server/config');
var login = require('./server/routesLogin');
var authCheck = require('./server/authenticationCheck');

//vars
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {    
    if (app.settings.env === 'production' && '/robots.txt' == req.url) {
        fs.readFile('../robots.txt', 'utf-8', function (error, data) {
			res.sendFile(path.join(__dirname + '/robots.txt'));
		});
    } else {
        next();
    }
});

login.setLoginRoutes(app, router);

var routes = require('./server/routesCustom.js').init(__dirname);

routes.setApiRoutes(router);
routes.setFileRoutes(app);
routes.setClientRoutes(router);
routes.catch404(router);

//routes defined after this midleware will check roles/rights
authCheck.configure(app, router);

routes.setAdminRoutes(router);

app.use('/', router);

app.listen(port);
console.log('listening on port ' + port);
