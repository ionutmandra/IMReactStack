import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';
import * as C from "../constants";


module.exports.reducerName = 'auth';

var initState = {    
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};
module.exports.intialState = initState;

module.exports.createReducer = function(state,action){

    switch(action.type){

        case C.LOGIN_USER_REQUEST:
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });

        case C.LOGIN_USER_SUCCESS:
        return  Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': action.payload.token,
            'userName': jwtDecode(action.payload.token).userName,
            'statusText': 'You have been successfully logged in.'
        });


        case C.LOGIN_USER_FAILURE:        
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
        });


        case C.LOGOUT_USER:
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });

        default: return state ||initState;
    }
};