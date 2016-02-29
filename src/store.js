/*
This file defines the main Redux Store. It will be required by all "smart" components in the app
*/

var Redux = require("redux"),
aboutReducer = require("./reducers/about"),
blogsReducer = require("./reducers/blogs"),
initialState = require("./initialstate"),	
thunk = require('redux-thunk'); // allows us to use asynchronous actions

var rootReducer = Redux.combineReducers({	
	about: aboutReducer,// about will operate on appState.about,
  blogs: blogsReducer
});


const store = Redux.createStore(
  rootReducer,
  initialState(),
  Redux.compose(
    Redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f=>f      
    )
  );

module.exports = store;