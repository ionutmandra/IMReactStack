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
LoginComponent = require('./components/LoginComponent');
import aboutDetails from  './components/aboutDetails';
import {requireAuthentication} from './components/AuthenticatedComponent';

module.exports = (
    <div class="root">    
        <Route path="/" component={Wrapper}>
            <IndexRoute component={Home} />        
            <Route path="/about" component={AboutList}>        
                <Route path="/about/:name" component={aboutDetails} />                
            </Route>
            <Route path="/blogs" component={BlogList}>
                <Route path="/blogs/:name" component={BlogDetails} />
            </Route>        
        </Route>
        <div>
            <Route path="/admin" component={LoginComponent}>
            </Route>        
            <Route path="/adminHome" component={requireAuthentication(AdminHome)}>        
            </Route>
        </div>
    </div>
    );
