import { connect } from 'react-redux';
import translate from './translate';
import ProjectDetails from '../components/projectDetails';

const stateToProps = state => ({
    items: state.projects.items,
});

export default connect(stateToProps)(translate('ProjectDetails')(ProjectDetails));