import Logo from '../components/logo';
import { connect } from 'react-redux';
import { transition, enableScenes, disableScenes } from '../actions';

const stateToProps = state => ({
    transition: state.transition,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(transition(setup));
        },
		enableScenes: () => {
			dispatch(enableScenes());
		},
		disableScenes: () => {
			dispatch(disableScenes());
		},
    };
};

export default
    connect(stateToProps, mapDispatchToProps)(
        Logo);