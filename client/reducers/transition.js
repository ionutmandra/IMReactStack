import C from '../config/constants';
import { transition as data } from '../config/data';

export default (state, action) => {
	switch (action.type) {
		case C.TRANSITION:
			return Object.assign({}, state, action.payload);
		case C.ENABLE_SCENES:
			return Object.assign({}, state, { scrollScenesEnabled: true });
		case C.DISABLE_SCENES:
			return Object.assign({}, state, { scrollScenesEnabled: false });
		default: return state || data;
	}
};
