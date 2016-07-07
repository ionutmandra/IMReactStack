import { connect } from 'react-redux';
import translate from './translate';
import ProjectDetails from '../components/projectDetails';
import * as actions from '../actions';

const stateToProps = state => ({
    items: state.projects.items,
});
const mapDispatchToProps = (dispatch) => {
    return {
        enableScenes: () => {
			dispatch(actions.enableScenes());
		},
		disableScenes: () => {
			dispatch(actions.disableScenes());
		},
    };
};

export default connect(stateToProps, mapDispatchToProps)(translate('ProjectDetails')(ProjectDetails));
