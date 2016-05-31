import { connect } from 'react-redux';
import translate from './translate';
import transition from './transition';
import Services from '../components/services';

const stateToProps = state => ({
    items: state.services.items,
});

export default 
    transition(
        connect(stateToProps)(
            translate('Services')(
                Services)));