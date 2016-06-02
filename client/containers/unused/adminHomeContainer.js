import {connect} from 'react-redux';
import * as actions from '../actions';
import AdminHome from '../components/adminHome';

const mapStateToProps = (state) => ({
	data: state.about,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProtectedData: function (token) {
			dispatch(actions.editMembers(token));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
