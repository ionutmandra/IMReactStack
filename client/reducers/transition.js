import C from '../config/constants';
import { transition as data } from '../config/data';

export default (state, action) => {
	console.warn('reducer', state, action, data);
	switch (action.type) {
		case C.TRANSITION:
			return Object.assign({}, data, action.payload);
		default: return state || data;
	}
};
