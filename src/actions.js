/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

import fetch from 'isomorphic-fetch'
var constants = require("./constants");
require('es6-promise').polyfill();

	module.exports = {
	reset: function(){
		// A normal action creator, returns a simple object describing the action.
		return {type:constants.RESET};
	},	
	addMember: function(member){	
		return function( dispatch,getState){
			dispatch({type:constants.ADD_MEMBER,member:member});			
		};
	},
	removeMember: function(member){	
		return function( dispatch,getState){
			dispatch({type:constants.REMOVE_MEMBER,member:member});			
		};
	},
	getInitialMembers: function(){	
		return function( dispatch,getState){
			return fetch('http://localhost:8080/api/members')
      				.then(response => response.json())
      				.then(json => dispatch({type:constants.INIT_MEMBERS_LIST, data:json}));	
		};
	},
	addBlog: function(blog){	
		return function( dispatch,getState){
			dispatch({type:constants.ADD_BLOG,blog:blog});			
		};
	},
	removeBlog: function(blog){	
		return function( dispatch,getState){
			dispatch({type:constants.REMOVE_BLOG,blog:blog});
		};
	},
	getInitialBlogs: function(){	
		return function( dispatch,getState){
			return fetch('http://localhost:8080/api/blogs')
      				.then(response => response.json())
      				.then(json => dispatch({type:constants.INIT_BLOGS_LIST, data:json}));	
		};
	}
};	