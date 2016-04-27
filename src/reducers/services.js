import C from '../constants';
import { services as defaults } from './defaults';

export default (state, action) => {
    //let newState = Object.assign({}, defaults, state);
    
    switch (action.type) {
        // case C.CHANGE_LANGUAGE:
        //     newState.current = action.language || defaults.current;
        //     return newState;
        default:
            return defaults;
    }
};