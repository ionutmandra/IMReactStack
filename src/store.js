/*
This file defines the main Redux Store. It will be required by all "smart" components in the app
*/

var Redux = require("redux"),
aboutReducer = require("./reducers/about"),
blogsReducer = require("./reducers/blogs"),
authReducer = require("./reducers/auth"),
initialState = require("./initialstate")(),	
thunk = require('redux-thunk'); // allows us to use asynchronous actions


initialState[authReducer.reducerName] = authReducer.initialState;

var rootReducer = Redux.combineReducers({	
	about: aboutReducer,// about will operate on appState.about,
  	blogs: blogsReducer,
	[authReducer.reducerName] : authReducer.createReducer
});


const store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.compose(
    Redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f=>f      
    )
  );

module.exports = store;