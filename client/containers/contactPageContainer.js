import translate from './translate';
import transition from './transition';
import ContactPage from '../components/contactPage';
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
    transition(
        connect(null, mapDispatchToProps)(
            translate('ContactPage')(
                ContactPage)));
