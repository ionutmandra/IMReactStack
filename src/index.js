/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,
	hashHistory = require('react-router').hashHistory,
	Provider = require('react-redux').Provider,
	store = require('./store'),
	routes = require('./routes');

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store s
	// using ReactRedux.connect (see components Home and Hero)s
	<Provider store={store}>
		<Router routes={routes} history={hashHistory} />
	</Provider>,
	document.getElementById("root")
);