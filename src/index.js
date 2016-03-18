/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

import { hashHistory } from 'react-router'
import { browserHistory  } from 'react-router'
import * as actions from './actions'

var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,	
	Provider = require('react-redux').Provider,
	store = require('./store'),
	routes = require('./routes');

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store using ReactRedux.connect
	<Provider store={store}>
		<Router routes={routes} history={hashHistory } />
		{/* <Router routes={routes} history={browserHistory } /> *//**//**/}
	</Provider>,
	document.getElementById("root")
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(actions.loginUserSuccess(token));
}