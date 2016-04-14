import C from '../constants';

export default (state, action) => {
    const defaults = {
        current: 'en',
    };
    let newState = Object.assign({}, defaults, state);
    
    switch (action.type) {
        case C.CHANGE_LANGUAGE:
            newState.current = action.language || defaults.current;
            return newState;
        default:
            return defaults;
    }
};