import translate from './translate';
import transition from './transition';
import Home from '../components/home';
import { connect } from 'react-redux';
import * as actions from '../actions';

const stateToProps = state => ({
    transition: state.transition,
});

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
    transition(
        connect(stateToProps, mapDispatchToProps)(
            translate('Home')(
                Home)));
