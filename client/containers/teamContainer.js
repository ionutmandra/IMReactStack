import translate from './translate';
import transition from './transition';
import Team from '../components/team';

export default 
    transition(
        translate('Team')(
            Team));
