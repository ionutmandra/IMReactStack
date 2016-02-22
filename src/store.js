/*
This file defines the main Redux Store. It will be required by all "smart" components in the app,
in our case Home and Hero.
*/

var Redux = require("redux"),
	heroReducer = require("./reducers/heroes"),
	battlefieldReducer = require("./reducers/battlefield"),
	aboutReducer = require("./reducers/about"),
	initialState = require("./initialstate"),	
	thunk = require('redux-thunk'); // allows us to use asynchronous actions

var rootReducer = Redux.combineReducers({
	heroes: heroReducer,   // this means heroReducer will operate on appState.heroes
	battlefield: battlefieldReducer, // battlefieldReducer will operate on appState.battlefield,
	about: aboutReducer,
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState());

