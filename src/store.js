/*
This file defines the main Redux Store. It will be required by all 'smart' components in the app
*/

var aboutReducer = require('./reducers/about'),
    blogsReducer = require('./reducers/blogs'),
    authReducer = require('./reducers/auth'),
    thunk = require('redux-thunk'); // allows us to use asynchronous actions
import * as Redux from 'redux';
import {reducer as formReducer} from 'redux-form';
import langReducer from './reducers/lang';
import initialState from './initialstate';

initialState[authReducer.reducerName] = authReducer.initialState;

const rootReducer = Redux.combineReducers({
    about: aboutReducer,// about will operate on appState.about,
    blogs: blogsReducer,
    form: formReducer,
    lang: langReducer,
    [authReducer.reducerName]: authReducer.createReducer,
});

const store = Redux.createStore(
    rootReducer,
    initialState, //TODO: remove initialState from here and fix Reducers to provide initial state on their own
    Redux.compose(
        Redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

module.exports = store;