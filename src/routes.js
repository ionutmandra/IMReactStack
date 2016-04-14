/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Home = require('./components/home'),
    AdminHome = require('./containers/adminHome'),
    AboutList = require('./containers/aboutList').component,
    BlogList = require('./containers/blogList'),
    BlogDetails = require('./components/blogDetails'),
    LoginComponent = require('./components/LoginComponent'),
routePaths = require('../common/routePaths');
import aboutDetails from  './components/aboutDetails';
import ContactPage from './components/contact';
import {requireAuthentication} from './components/AuthenticatedComponent';
import GridsPage from './containers/gridsPage';
import Wrapper from './components/wrapper';
import translate from './hoc/translation';

module.exports = (
    <div className="root">
        <Route path={routePaths.client.root} component={Wrapper}>
            <IndexRoute component={Home} />
            <Route path={routePaths.client.about} component={AboutList}>
                <Route path={routePaths.client.aboutName} component={translate('aboutDetails')(aboutDetails)} />
            </Route>
            <Route path={routePaths.client.blogs} component={BlogList}>
                <Route path={routePaths.client.blogsName} component={BlogDetails} />
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
