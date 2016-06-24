import C from '../config/constants';
import { ui as data } from '../config/data';

export default (state, action) => {
	switch (action.type) {
		case C.MEDIA:
			return Object.assign({}, state, { media: action.payload });
		default: return state || data;
	}
};
