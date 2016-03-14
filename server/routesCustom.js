var express = require('express');
var path = require('path');
var fs = require('fs');
var rootPath = '';
var winston = require('winston');
var db = require(__dirname + '/respository');
var async = require('async');

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
};

function setPageRoutes(router){
	router.get('/', function(req, res) {
		fs.readFile("../index.html", 'utf-8', function (error, data) {

			winston.log('index html ', {timestamp: Date.now(), pid: process.pid});

			res.sendFile(path.join(rootPath + '/index.html'));
			//https://www.npmjs.com/package/serve-static
		});
	});

	router.get('/about', function(req, res) {
		res.send('im the about page2!'); 
	});

	router.get('/hello/:name', function(req, res) {
		res.send('hello ' + req.params.name + '!');
	});
};

function setFileRoutes(app){
	app.use('/dist', express.static(path.join(rootPath + '/dist')));
	app.use('/css', express.static(path.join(rootPath + '/css')));
};

function setAdminRoutes(router){
	router.get('/api/editMembers', function(req, res) {			

		var initialState = {
			generalInfo:{description: 'fuisabfiusabfasui'},
			members:[ 
			{name:'ionut',email:'ionut@ionut.com',id:1}, 
			{name:'tudrel',email:'tudrel@tudrel.com',id:2},
			{name:'marusica',email:'marusciac@tudrel.com',id:3}]};

			res.json(initialState);		
		});
};

module.exports = {
	init:function(rootPathParam){
		rootPath =rootPathParam;

		return{
			setPageRoutes:setPageRoutes,
			setApiRoutes:setApiRoutes,
			setFileRoutes:setFileRoutes,
			setAdminRoutes: setAdminRoutes
		};
	}	
};