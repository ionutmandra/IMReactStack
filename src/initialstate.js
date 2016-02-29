/*
This is the initial state of the Redux Store. I store it in a separate file because I also use
it in the reducers when we do the Reset action.

It returns a function instead of an object to make sure no one can change the initial state.

Shape of the state object matches the keys of the passed reducers
*/

var C = require("./constants");

module.exports = function(){
	return {		
		about:{
			generalInfo:{description: 'about description'},
			 members:[]
			// members:[
			// {name:'ionut',email:'ionut@ionut.com',id:1}, 
			// {name:'tudrel',email:'tudrel@tudrel.com',id:2}]
		},
		blogs:{
			generalInfo:{description: 'blogs description'},
			blogList:[],
		}
	};
};