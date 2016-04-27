/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRedirect = ReactRouter.IndexRedirect,
    AdminHome = require('./containers/adminHome'),
    AboutList = require('./containers/aboutList').component,
    LoginComponent = require('./components/LoginComponent'),
routePaths = require('../common/routePaths');
import AboutDetails from  './components/aboutDetails';
import ContactPage from './components/contact';
import {requireAuthentication} from './components/AuthenticatedComponent';
import GridsPage from './containers/gridsPage';
import ProjectsList from './containers/projectsList';
import ServicesList from './containers/services';
import ProjectDetails from './components/projectDetails';
import Team from './containers/team';
import Members from './containers/members';
import MemberDetails from './components/memberDetails';
import Culture from './components/culture';
import Gallery from './containers/gallery';
import Wrapper from './containers/wrapper';
import Home from './components/home';

module.exports = (
    <div className="root">
        <Route component={Wrapper}>
            <Route path={routePaths.client.root} component={Home} />
            <Route path={routePaths.client.about} component={AboutList}>
                <Route path={routePaths.client.aboutName} component={AboutDetails} />
            </Route>
            <Route path={routePaths.client.services} component={ServicesList} />
            <Route path={routePaths.client.projects} component={ProjectsList}>
                <Route path={routePaths.client.projectDetails} component={ProjectDetails} />
            </Route>
            <Route path={routePaths.client.team.index} component={Team}>
                <IndexRedirect to={routePaths.client.team.culture} />
                <Route path={routePaths.client.team.culture} component={Culture} />
                <Route path={routePaths.client.team.members} component={Members}>
                    <Route path={routePaths.client.team.memberDetails} component={MemberDetails} />
                </Route>
                <Route path={routePaths.client.team.gallery} component={Gallery} />
            </Route>
            <Route path={routePaths.client.contact} component={ContactPage} />
        </Route>
        <Route path={routePaths.client.lists} component={GridsPage} />
        <div>
            <Route path={routePaths.client.admin} component={LoginComponent} />
            <Route path={routePaths.client.adminHome} component={requireAuthentication(AdminHome)} />
        </div>
    </div>
);
