/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    AdminHome = require('./containers/adminHome'),
    AboutList = require('./containers/aboutList').component,
    LoginComponent = require('./components/LoginComponent'),
routePaths = require('../common/routePaths');
import AboutDetails from  './components/aboutDetails';
import ContactPage from './components/contact';
import {requireAuthentication} from './components/AuthenticatedComponent';
import GridsPage from './containers/gridsPage';
import ProjectsList from './containers/projectsList';
import ProjectDetails from './components/projectDetails';
import Wrapper from './containers/wrapper';
import Home from './components/home';

module.exports = (
    <div className="root">
        <Route path={routePaths.client.root} component={Wrapper}>
            <IndexRoute component={Home} />
            <Route path={routePaths.client.about} component={AboutList}>
                <Route path={routePaths.client.aboutName} component={AboutDetails} />
            </Route>
            <Route path={routePaths.client.contact} component={ContactPage} />
            <Route path={routePaths.client.projects} component={ProjectsList}>
                <Route path={routePaths.client.projectDetails} component={ProjectDetails} />
            </Route>
        </Route>
        <Route path={routePaths.client.lists} component={GridsPage} />
        <div>
            <Route path={routePaths.client.admin} component={LoginComponent} />
            <Route path={routePaths.client.adminHome} component={requireAuthentication(AdminHome)} />
        </div>
    </div>
);
