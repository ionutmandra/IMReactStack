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
			newstate.members.push(action.member);
			return newstate;
		case C.REMOVE_MEMBER:			
			var elementPos = state.members.map(function(x) {return x.id; }).indexOf(action.member);			
			newstate.members.splice(elementPos,1);
			return newstate;		
		default: return state || initialState();
	}
};