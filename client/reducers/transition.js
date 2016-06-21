import C from '../config/constants';
import { transition as data } from '../config/data';

export default (state, action) => {
	switch (action.type) {
		case C.TRANSITION:
			return Object.assign({}, data, action.payload);
		case C.ENABLE_SCENES:
			return Object.assign({}, data, { scrollScenesEnabled: true });
		case C.DISABLE_SCENES:
			return Object.assign({}, data, { scrollScenesEnabled: false });
		default: return state || data;
	}
};
