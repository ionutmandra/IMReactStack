import C from '../config/constants';
import { lang as data } from '../config/data';

export default (state, action) => {
    let newState = Object.assign({}, data, state);
    
    switch (action.type) {
        case C.CHANGE_LANGUAGE:
            newState.current = action.language || data.current;
            return newState;
            
        default: return state || data;
    }
};