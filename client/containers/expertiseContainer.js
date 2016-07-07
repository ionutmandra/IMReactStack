import translate from './translate';
import transition from './transition';
import Expertise from '../components/expertise';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(actions.transition(setup));
        },
        enableScenes: () => {
			dispatch(actions.enableScenes());
		},
		disableScenes: () => {
			dispatch(actions.disableScenes());
		},
    };
};

export default
    transition(connect(null, mapDispatchToProps)(translate('Expertise')(Expertise)));
