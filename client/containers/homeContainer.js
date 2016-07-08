import translate from './translate';
import transition from './transition';
import Home from '../components/home';
import { connect } from 'react-redux';
import * as actions from '../actions';

const stateToProps = state => ({
    transition: state.transition,
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: function (setup) {
            dispatch(actions.transition(setup));
        },
    };
};

export default
    transition(
        connect(stateToProps, mapDispatchToProps)(
            translate('Home')(
                Home)));
