import translate from './translate';
import transition from './transition';
import Portfolio from '../components/portfolio';

export default
    transition(
        translate('Portfolio')(
            Portfolio));