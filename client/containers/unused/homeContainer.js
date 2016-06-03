import translate from './translate';
import transition from './transition';
import Home from '../components/home';

export default 
    transition(
        translate('Home')(
            Home));
