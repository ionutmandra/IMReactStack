import { connect } from 'react-redux';
import translate from './translate';
import ProjectsList from '../components/projectsList';

const stateToProps = state => ({
    items: state.projects.items,
});

export default connect(stateToProps)(translate('ProjectsList')(ProjectsList));