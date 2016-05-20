import { connect } from 'react-redux';
import Gallery from '../components/gallery';

const stateToProps = state => ({
    items: state.team.gallery,
});

export default connect(stateToProps)(Gallery);