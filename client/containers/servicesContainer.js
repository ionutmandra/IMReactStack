import { connect } from 'react-redux';
import translate from './translate';
import Services from '../components/services';

const stateToProps = state => ({
    items: state.services.items,
});

export default connect(stateToProps)(translate('Services')(Services));