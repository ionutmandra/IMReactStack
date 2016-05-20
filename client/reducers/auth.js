import jwtDecode from 'jwt-decode';
import C from '../config/constants';
import { auth as data } from '../config/data';

export default (state, action) => {
    
    switch (action.type) {
        case C.LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                'isAuthenticating': true,
                'statusText': null,
            });

        case C.LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.payload.token,
                'userName': jwtDecode(action.payload.token).userName,
                'statusText': 'You have been successfully logged in.',
            });


        case C.LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
            });


        case C.LOGOUT_USER:
            return Object.assign({}, state, {
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': 'You have been successfully logged out.',
            });

        default: return state || data;
    }
};