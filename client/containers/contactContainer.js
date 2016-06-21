import { connect } from 'react-redux';
import Contact from '../components/contact';
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
        Contact);