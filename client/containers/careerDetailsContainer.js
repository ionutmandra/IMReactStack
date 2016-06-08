import translate from './translate';
import transition from './transition';
import CareerDetails from '../components/careerDetails';

export default
    transition(
        translate('Careers')(
            CareerDetails));