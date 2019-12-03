/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

import { browserHistory  } from 'react-router';
import * as actions from './actions';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store using ReactRedux.connect
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('root')
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(actions.loginUserSuccess(token));
}