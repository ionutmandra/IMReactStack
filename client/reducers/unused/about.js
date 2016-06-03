import C from '../config/constants';
import { about as data } from '../config/data';

export default (state, action) => {
	let newstate = Object.assign({}, state);
	
	switch (action.type) {
		case C.GET_MEMBERS: 
			return data.about.members;
		
		case C.ADD_MEMBER: 
			newstate.members = state.members.concat({
				id: newstate.members.length + 1,
				name: action.member,
				email: 'c@c.com',
			});
			return newstate;
		
		case C.REMOVE_MEMBER: {
			const index = state.members.map(function (x) { return x.id; }).indexOf(action.member);
			newstate.members = state.members.slice(0, index)
				.concat(state.members.slice(index + 1));
			return newstate;
		}
		case C.INIT_MEMBERS_LIST: 
			newstate.members = action.data.members;
			newstate.membersInfo = action.data.membersInfo;
			return newstate;
		
		default: return state || data;
	}
};
