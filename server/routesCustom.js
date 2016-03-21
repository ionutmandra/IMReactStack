var express = require('express');
var path = require('path');
var fs = require('fs');
var rootPath = '';
var winston = require('winston');
var db = require(__dirname + '/respository');
var async = require('async');
var routePaths = require('../routePaths');

function setApiRoutes(router){
	
	winston.log('info', 'setting api routes ', {timestamp: Date.now(), pid: process.pid});	

	router.get('/api/members', function(req, res) {		

		var membersRepo = new db.create('members');
		var memberslInfo = new db.create('membersInfo');

		async.parallel([
			function(cb) { membersRepo.find(cb) },
			function(cb) { memberslInfo.find( cb) }
			], function(err, dataResult) {
				if (!err) {

					var result = Object.assign({},
						{members:dataResult[0].data},
						{membersInfo:dataResult[1].data});

					res.json(result);
				}
				else{
					res.json({Err:err});
				}
			});
	});

	router.get('/api/blogs', function(req, res) {		
		
		var membersRepo = new db.create('blogList');
		var memberslInfo = new db.create('blogsInfo');

		async.parallel([
			function(cb) { membersRepo.find(cb) },
			function(cb) { memberslInfo.find( cb) }
			], function(err, dataResult) {
				if (!err) {

					var result = Object.assign({},
						{blogList:dataResult[0].data},
						{blogsInfo:dataResult[1].data});

					res.json(result);
				}
				else{
					res.json({Err:err});
				}
			});
	});

	router.get('/api/about', function(req, res) {
		res.send('im the about page2!'); 
	});

	router.get('/api/hello/:name', function(req, res) {
		res.send('hello ' + req.params.name + '!');
	});
};

function setClientRoutes(router){
	var routes = routePaths.client;

	for (var r in routes) {
		if (routes.hasOwnProperty(r)) {
			router.all(routes[r], function (req, res) {
				fs.readFile("../index.html", 'utf-8', function (error, data) {

					winston.log('index html ', {timestamp: Date.now(), pid: process.pid});

					res.sendFile(path.join(rootPath + '/index.html'));
					//https://www.npmjs.com/package/serve-static
				});
			});	
		}
	}
};

function setFileRoutes(app){
	app.use('/dist', express.static(path.join(rootPath + '/dist')));
	app.use('/res', express.static(path.join(rootPath + '/res')));
};

function setAdminRoutes(router){
	router.get(routePaths.serverAuthorized.apiEditMembers, function(req, res) {			

		var initialState = {
			generalInfo:{description: 'fuisabfiusabfasui'},
			members:[ 
			{name:'ionut',email:'ionut@ionut.com',id:1}, 
			{name:'tudrel',email:'tudrel@tudrel.com',id:2},
			{name:'marusica',email:'marusciac@tudrel.com',id:3}]};

			res.json(initialState);		
		});
};

function catch404(router){
	var routes = routePaths.serverAuthorized, matchFound = false;

	router.use(function(req, res, next){
		matchFound = false;
		next();
	});
	for (var r in routes) {
		if (routes.hasOwnProperty(r)) {
			router.all(routes[r], function(req, res, next){
				matchFound = true;
				next();
			});	
		}
	}
	router.use(function(req, res, next){
		if (matchFound) {
			next();
		}else{
			res.status(404).send({ 
		        success: false, 
		        message: '404 Not found',
		    });
		}
	});
}

module.exports = {
	init:function(rootPathParam){
		rootPath =rootPathParam;

		return{
			setClientRoutes:setClientRoutes,
			setApiRoutes:setApiRoutes,
			setFileRoutes:setFileRoutes,
			setAdminRoutes: setAdminRoutes,
			catch404: catch404,
		};
	}	
};