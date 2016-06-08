import translate from './translate';
import Header from '../components/header';
import { connect } from 'react-redux';
import { transition } from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        transition: function (setup) {
            dispatch(transition(setup));
        },
    };
};

export default
    connect(null, mapDispatchToProps)(
        translate('Header')(
            Header));