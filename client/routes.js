import React from 'react';
import { Route } from 'react-router';
import routePaths from '../common/routePaths';
import Wrapper from './containers/wrapperContainer';
import Home from './containers/homeContainer';
import About from './containers/aboutContainer';
import Expertise from './containers/expertiseContainer';
import Portfolio from './containers/portfolioContainer';
import PortfolioDetails from './containers/portfolioDetailsContainer';
import PortfolioSE from './containers/portfolioSEContainer';
import Careers from './containers/careersContainer'; 
import CareerDetails from './containers/careerDetailsContainer'; 
import ContactPage from './containers/contactPageContainer';
import NeedHelp from './containers/needHelpContainer';

module.exports = (
    <div className="root">        
        <Route component={Wrapper}>    
            <Route path={routePaths.client.root} component={Home} />
            <Route path={routePaths.client.about} component={About} />
            <Route path={routePaths.client.expertise} component={Expertise} />
            <Route path={routePaths.client.portfolio} component={Portfolio} />
            <Route path={routePaths.client.portfolioSfb} component={PortfolioDetails} />
            <Route path={routePaths.client.portfolioSe} component={PortfolioSE} />
            <Route path={routePaths.client.careers} component={Careers} />
            <Route path={routePaths.client.careerDetails} component={CareerDetails} />
            <Route path={routePaths.client.contact} component={ContactPage} />
            <Route path={routePaths.client.needHelp} component={NeedHelp} />
        </Route>
    </div>
);
