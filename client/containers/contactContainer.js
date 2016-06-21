import transition from './transition';
import { connect } from 'react-redux';
import Contact from '../components/contact';

const stateToProps = state => ({
    transition: state.transition,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(transition(setup));
        },
    };
};


export default
    transition(
        connect(stateToProps, mapDispatchToProps)(
            Contact));