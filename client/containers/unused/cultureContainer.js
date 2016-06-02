import { connect } from 'react-redux';
import Culture from '../components/culture';

const stateToProps = state => ({
    culture: state.team.culture,
});

export default connect(stateToProps)(Culture);