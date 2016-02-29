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
	duckDown: function(who){
		// here we take advantage of Redux-thunk; instead of returning an object describing an action,
		// we return a function that takes dispatch and getState as arguments. This function can then
		// invoke dispatch, now or later using setTimeout or similar.
		return function(dispatch,getState){
			dispatch({type:constants.DUCK_DOWN,coward:who});
			setTimeout(function(){
				dispatch({type:constants.STAND_UP,coward:who});
			},2000);
		}
	},
	aimAt: function(killer,victim){
		// Another async action using the Redux-thunk syntax
		return function(dispatch,getState){
			dispatch({type:constants.AIM_AT,killer:killer,victim:victim});
			setTimeout(function(){
				dispatch({type:constants.KILL_HERO,killer:killer,victim:victim});
			},2000);
		};
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
	}
};	