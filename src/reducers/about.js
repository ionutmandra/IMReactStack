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
		case C.GET_MEMBERS:
		return initialState().about.members;
		
		case C.ADD_MEMBER:
		var index = newstate.members.length + 1;
		//new obj in memory
		newstate.members = state.members.concat({name:action.member,email:'c@c.com',id:index});		
		return newstate;
		
		case C.REMOVE_MEMBER:					
		var index = state.members.map(function(x) {return x.id; }).indexOf(action.member);			
		newstate.members = state.members
		.slice(0, index)
		.concat(state.members.slice(index+1));
		return newstate;
		
		case C.INIT_MEMBERS_LIST:			
		newstate.members = action.data.members;
		newstate.generalInfo = action.data.generalInfo;
		return newstate;		
		default: return state || initialState();
	}
};