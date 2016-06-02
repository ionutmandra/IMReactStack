import * as ReactRedux from 'react-redux';
import actions from '../actions';
import AboutList from '../components/aboutList';

var mapStateToProps = function(state) {
	return {
		aboutState: state.about,
	};
};

var mapDispatchToProps = function(dispatch) {
	return {
		addMember: function(member) {
			dispatch(actions.addMember(this.state.newItemText));
        },
		removeMember: function(member) {
			dispatch(actions.removeMember(member));
        },
		getInitialMembers:function() {
			dispatch(actions.getInitialMembers());
        },
	};
};

module.exports.component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutList);
