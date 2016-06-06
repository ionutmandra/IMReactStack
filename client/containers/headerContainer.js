import translate from './translate';
import Header from '../components/header';
import { connect } from 'react-redux';
import { transition } from '../actions';

const stateToProps = state => ({
    currentTransition: state.transition,
});

const mapDispatchToProps = (dispatch) => {
    return {
        transition: function (setup) {
            dispatch(transition(setup));
        },
    };
};

export default
    connect(stateToProps, mapDispatchToProps)(
        translate('Header')(
            Header));