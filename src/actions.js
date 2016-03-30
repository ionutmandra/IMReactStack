/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

import fetch from 'isomorphic-fetch'
var constants = require("./constants");
require('es6-promise').polyfill();
import jwtDecode from 'jwt-decode';
import { pushState } from 'redux-router';


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
		}
	},

	//AUTH
	loginUserRequest:loginUserRequest,
	loginUserSuccess:loginUserSuccess,
	loginUserFailure :loginUserFailure,
	logout:logout,
	logoutAndRedirect:logoutAndRedirect,

	doLogin: function(usr, pwd, redirect="/"){	
		return function( dispatch,getState){
			dispatch(loginUserRequest());

			return fetch('http://localhost:8080/api/auth/login',{
				method: 'post',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({user: usr, password: pwd})
			})
			.then(response => response.json())
			.then(response => {			

				try {
					let decoded = jwtDecode(response.token);
					dispatch(loginUserSuccess(response.token));
					dispatch(pushState(null, redirect));
				} catch (e) {    

					console.log('Login Err', e);

					dispatch(loginUserFailure({
						response: {
							status: 403,
							statusText: 'Invalid token'
						}
					}));
				}
			});				
		}
	},
	editMembers: function(token){	
		return function( dispatch,getState){
			return fetch('http://localhost:8080/api/editMembers',{
				headers:{
					'x-access-token':token
				}
			})
			.then(response => response.json());			
		}
	},
};	

//AUTH
function loginUserRequest() {
	return {
		type:constants.LOGIN_USER_REQUEST
	}
};
function loginUserSuccess(token) {
	localStorage.setItem('token', token);
	return {
		type: constants.LOGIN_USER_SUCCESS,
		payload: {
			token: token
		}
	}
};
function loginUserFailure(error) {
	localStorage.removeItem('token');
	return {
		type: constants.LOGIN_USER_FAILURE,
		payload: {
			status: error.response.status,
			statusText: error.response.statusText
		}
	}
};

function logout() {
	localStorage.removeItem('token');
	return {
		type: constants.LOGOUT_USER
	}
};

function logoutAndRedirect() {
	return (dispatch, state) => {
		dispatch(logout());
		dispatch(pushState(null, '/login'));
	}
};
