import translate from './translate';
import Footer from '../components/footer';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(actions.transition(setup));
        },
    };
};

export default
    connect(null, mapDispatchToProps)(
        translate('Footer')(
            Footer));