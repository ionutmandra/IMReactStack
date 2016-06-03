import translate from './translate';
import transition from './transition';
import About from '../components/about';

export default
    transition(
        translate('About')(
            About));