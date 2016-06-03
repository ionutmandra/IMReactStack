import C from '../config/constants';
import { transition as data } from '../config/data';

export default (state, action) => {
	switch (action.type) {
		case C.TRANSITION:
			return Object.assign({}, data, action.payload);
		default: return state || data;
	}
};
