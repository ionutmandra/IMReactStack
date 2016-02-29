var express = require('express');
var path = require('path');
var fs = require('fs');
var rootPath = '';

function setApiRoutes(router){
	router.get('/api/members', function(req, res) {		

		var initialState = {
			generalInfo:{description: 'fuisabfiusabfasui'},
			members:[ 
			{name:'ionut',email:'ionut@ionut.com',id:1}, 
			{name:'tudrel',email:'tudrel@tudrel.com',id:2},
			{name:'marusica',email:'marusciac@tudrel.com',id:3}]};

			res.json(initialState);
		});

	router.get('/api/blogs', function(req, res) {		
		console.log('getting blogs');
		var initialState = {
			generalInfo:{description: 'blogs main description'},
			blogList:[ 
			{name:'blog1',email:'ionut@ionut.com',id:1}, 
			{name:'blog2',email:'tudrel@tudrel.com',id:2},
			{name:'blog3',email:'marusciac@tudrel.com',id:3}]};

			res.json(initialState);
		});
};

function setPageRoutes(router){
	router.get('/', function(req, res) {
		fs.readFile("../index.html", 'utf-8', function (error, data) {
			res.sendFile(path.join(rootPath + '/index.html'));
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

module.exports = {
	init:function(rootPathParam){
		rootPath =rootPathParam;
	},
	setPageRoutes:setPageRoutes,
	setApiRoutes:setApiRoutes,
	setFileRoutes:setFileRoutes
};