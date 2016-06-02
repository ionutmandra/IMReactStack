import { connect } from 'react-redux';
import translate from './translate';
import MemberDetails from '../components/memberDetails';

const stateToProps = state => ({
    items: state.team.members,
});

export default connect(stateToProps)(translate('MemberDetails')(MemberDetails));