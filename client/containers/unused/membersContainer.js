import { connect } from 'react-redux';
import translate from './translate';
import Members from '../components/members';

const stateToProps = state => ({
    items: state.team.members,
});

export default connect(stateToProps)(translate('Members')(Members));