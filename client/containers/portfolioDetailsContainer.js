import translate from './translate';
import transition from './transition';
import PortfolioDetails from '../components/portfolioDetails';

export default
    transition(
        translate('Portfolio')(
            PortfolioDetails));