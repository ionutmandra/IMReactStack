/*
This file defines the main Redux Store. It will be required by all 'smart' components in the app
*/

import thunk from 'redux-thunk'; // allows us to use asynchronous actions
import * as Redux from 'redux';
// import authReducer from './reducers/auth';
// import {reducer as formReducer} from 'redux-form';
// import aboutReducer from './reducers/about';
// import projectsReducer from './reducers/projects';
// import servicesReducer from './reducers/services';
// import teamReducer from './reducers/team';
import langReducer from './reducers/lang';
import transitionReducer from './reducers/transition';

const rootReducer = Redux.combineReducers({
    // about: aboutReducer,
    // form: formReducer,
    // projects: projectsReducer,
    // services: servicesReducer,
    // team: teamReducer,
    lang: langReducer,
    transition: transitionReducer,
    //[authReducer.reducerName]: authReducer.createReducer,
});

const store = Redux.createStore(
    rootReducer,
    Redux.compose(
        Redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
); 

module.exports = store;