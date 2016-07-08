import { connect } from 'react-redux';
import Contact from '../components/contact';
import { transition } from '../actions';

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
        Contact);