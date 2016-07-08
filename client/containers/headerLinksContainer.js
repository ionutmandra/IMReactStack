import { PropTypes } from 'react';
import translate from './translate';
import HeaderLinks from '../components/headerLinks';
import { connect } from 'react-redux';
import { transition, enableScenes, disableScenes } from '../actions';

const stateToProps = state => ({
    transition: state.transition,
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTransition: (setup) => {
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

HeaderLinks.contextTypes = {
  router: PropTypes.object,
};

export default 
    connect(stateToProps, mapDispatchToProps)(
        translate('HeaderLinks')(
            HeaderLinks));