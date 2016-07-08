import Logo from '../components/logo';
import { connect } from 'react-redux';
import { transition, enableScenes, disableScenes } from '../actions';

const stateToProps = state => ({
    transition: state.transition,
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(transition(setup));
        },
    };
};

export default
    connect(stateToProps, mapDispatchToProps)(
        Logo);