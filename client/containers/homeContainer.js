import translate from './translate';
import transition from './transition';
import Home from '../components/home';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        transition: function (setup) {
            dispatch(actions.transition(setup));
        },
    };
};

export default
    transition(connect(null, mapDispatchToProps)(translate('Home')(Home)));
