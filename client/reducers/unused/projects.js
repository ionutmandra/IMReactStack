import { projects as data } from '../config/data';

export default (state, action) => {
    switch (action.type) {
        default: return state || data;
    }
};