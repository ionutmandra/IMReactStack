var express = require('express');
var path = require('path');
var fs = require('fs');
var rootPath = '';
var winston = require('winston');
var db = require(__dirname + '/respository');
var async = require('async');
var routePaths = require('../common/routePaths');
var pathToRegexp = require('path-to-regexp');
var validators = require('../common/validators');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var https = require('https');

//setup regexes to skip when checking for 404 (prevent server authenticated routes to get 404)
var skip404regexes = [];
var routes = routePaths.serverAuthorized;
for (var r in routes) {
	if (routes.hasOwnProperty(r)) {
		skip404regexes.push(pathToRegexp(routes[r]));
	}
}

module.exports = {
	init: function (rootPathParam) {
		rootPath = rootPathParam;

		return {
			setClientRoutes: setClientRoutes,
			setApiRoutes: setApiRoutes,
			setFileRoutes: setFileRoutes,
			setAdminRoutes: setAdminRoutes,
			catch404: catch404,
		};
	},
};

function setApiRoutes(router) {

	winston.log('info', 'setting api routes ', { timestamp: Date.now(), pid: process.pid });

	router.get('/api/members', function (req, res) {

		var membersRepo = new db.create('members');
		var memberslInfo = new db.create('membersInfo');

		async.parallel([
			function (cb) { db.getAllUsers(cb); },
			function (cb) { memberslInfo.find(cb); },
		], function (err, dataResult) {
			if (!err) {

				var result = Object.assign({},
					{ members: dataResult[0].data },
					{ membersInfo: dataResult[1].data });

				res.json(result);
			}
			else {
				res.json({ Err: err });
			}
		});
	});

	router.get('/api/about', function (req, res) {
		res.send('im the about page2!');
	});

	router.get('/api/hello/:name', function (req, res) {
		res.send('hello ' + req.params.name + '!');
	});

    router.post('/api/contact', function (req, res) {
		console.log('==================== API ENTRY ======================');
        var validation = validators.contact(req.body);
		console.log('validation', validation);
		if (validation.hasErrors) {
			res.send({ success: !validation.hasErrors, errors: validation.errors });
			return;
		}
		console.log('validation OK, validating captcha');
		var request = https.request({
			hostname: 'www.google.com',
			path: '/recaptcha/api/siteverify?secret=6LdPnxEUAAAAAJLi04M6j1vmB_g-SqS_I37l-JQ0&response=' + req.body.captcha,		
		}, function(res2) {
			console.log('========== RESPONSE FROM GOOGLE RECAPTCHA');
			console.log('statusCode:', res2.statusCode);
			console.log('headers:', res2.headers);

			res2.on('data', (d) => {
				let json = JSON.parse(d.toString());
				console.log('data:', d, json);
				if (json.success) {
					// create reusable transporter object using the default SMTP transport
					var transporter = nodemailer.createTransport('smtps://testingwhattheheck%40gmail.com:qweqwe!!@smtp.gmail.com');

					// setup e-mail data with unicode symbols
					var mailOptions = {
						from: '"test testiong" <testingwhattheheck@gmail.com>', // sender address
						to: 'testingwhattheheck@gmail.com', //'tudor@adaptabi.com, ', // list of receivers
						subject: 'Contact from Adaptabi website Contact Form', // Subject line
						text: 'Hello world ?', // plaintext body
						html: '<b>Hello world ?</b>', // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
						if(error){
							res.send({ success: false, errors: { submit: 'Mail sending failed.' } });
							return console.log(error);
						}
						console.log('Message sent: ' + info.response);
						db.insertContactDetails(req.body);
						res.send({ success: true, errors: { } });
					});

				} else {
					res.send({ success: false, errors: { captcha: 'Captcha validation failed.' } });
				}
			});
		});

		request.on('error', (e) => {
			console.log('error:', e);
			res.send({ success: false, errors: { captcha: 'Captcha validation request failed.' } });
		});
		
		request.end();
    });

	//init
	router.get('/api/initUsers', function (req, res) {
		db.initUsers();
	});
}

function setClientRoutes(router, routes) {
	routes = routes || routePaths.client;

	for (var r in routes) {
		if (routes.hasOwnProperty(r)) {
			if (_.isString(routes[r])) {
				router.all(routes[r], serveIndex);
			}
			if (_.isObject(routes[r])) {
				setClientRoutes(router, routes[r]);
			}
		}
	}

	function serveIndex(req, res) {
		fs.readFile('../index.html', 'utf-8', function (error, data) {
			winston.log('index html ', { timestamp: Date.now(), pid: process.pid });
			res.sendFile(path.join(rootPath + '/index.html'));
			//https://www.npmjs.com/package/serve-static
		});
	}
}

function setFileRoutes(app) {
	app.use('/email', express.static(path.join(rootPath + '/client/dist/email')));
	app.use('/client/dist', express.static(path.join(rootPath + '/client/dist')));
	app.use('/client/assets', express.static(path.join(rootPath + '/client/assets')));
	app.use('/favicon.ico', express.static(path.join(rootPath + '/favicon.ico')));
}

function setAdminRoutes(router) {
	router.get(routePaths.serverAuthorized.apiEditMembers, function (req, res) {

		var initialState = {
			generalInfo: { description: 'fuisabfiusabfasui' },
			members: [
				{ name: 'ionut', email: 'ionut@ionut.com', id: 1 },
				{ name: 'tudrel', email: 'tudrel@tudrel.com', id: 2 },
				{ name: 'marusica', email: 'marusciac@tudrel.com', id: 3 }],
		};

		res.json(initialState);
	});
}

function catch404(router) {
	router.use(function (req, res, next) {
		for (var r of skip404regexes) {
			if (r.test(req.path)) {
				next();
				return;
			}
		}
		res.status(404).send({
			success: false,
			message: '404 Not found',
		});
	});
}