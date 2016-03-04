var C = require("../constants"),
initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.battlefield data.
See `initialstate.js` for a clear view of what it looks like!
*/
module.exports = function(state,action){
	var newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
	switch(action.type){
		case C.GET_BLOGS:
		return initialState().blogs.blogList;
		
		case C.ADD_BLOG:
		var index = newstate.blogList.length + 1;
		//new obj in memory. do not mutate the old one
		newstate.blogList = state.blogList.concat({name:action.blog,email:'c@c.com',id:index});
		return newstate;
		
		case C.REMOVE_BLOG:			
		var elementPos = state.blogList.map(function(x) {return x.id; }).indexOf(action.blog);			
		newstate.blogList = state.blogList
		.slice(0, elementPos)
		.concat(state.blogList.slice(elementPos+1));
		return newstate;
		
		case C.INIT_BLOGS_LIST:			
		newstate.blogList = action.data.blogList;
		newstate.generalInfo = action.data.generalInfo;
		return newstate;		
		default: return state || initialState();
	}
};