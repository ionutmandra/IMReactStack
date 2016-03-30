/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
ReactRouter = require('react-router'),
Route = ReactRouter.Route,
IndexRoute = ReactRouter.IndexRoute,
Wrapper = require('./components/wrapper'),
Home = require('./components/home'),
AdminHome = require('./components/adminHome'),
AboutList = require('./components/aboutList').component,
// AboutDetails = require('./components/aboutDetails'),
BlogList = require('./components/blogList'),
BlogDetails = require('./components/blogDetails'),
LoginComponent = require('./components/LoginComponent'),
routePaths = require('../routePaths');
import aboutDetails from  './components/aboutDetails';
import {requireAuthentication} from './components/AuthenticatedComponent';

module.exports = (
    <div class="root">    
        <Route path={routePaths.client.root} component={Wrapper}>
            <IndexRoute component={Home} />        
            <Route path={routePaths.client.about} component={AboutList}>        
                <Route path={routePaths.client.aboutName} component={aboutDetails} />                
            </Route>
            <Route path={routePaths.client.blogs} component={BlogList}>
                <Route path={routePaths.client.blogsName} component={BlogDetails} />
            </Route>        
        </Route>
        <div>
            <Route path={routePaths.client.admin} component={LoginComponent}>
            </Route>        
            <Route path={routePaths.client.adminHome} component={requireAuthentication(AdminHome)}>        
            </Route>
        </div>
    </div>
    );
