import { connect } from 'react-redux';
import translate from './translate';
import transition from './transition';
import ProjectsList from '../components/projectsList';

const stateToProps = state => ({
    items: state.projects.items,
});

export default 
    transition(
        connect(stateToProps)(
            translate('ProjectsList')(
                ProjectsList)));