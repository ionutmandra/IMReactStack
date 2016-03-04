/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrapper = require('./components/wrapper'),
    Home = require('./components/home'),
    
    AboutList = require('./components/aboutList'),
    AboutDetails = require('./components/aboutDetails'),
    BlogList = require('./components/blogList'),
    BlogDetails = require('./components/blogDetails');

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home} />        
        <Route path="/about" component={AboutList}>        
            <Route path="/about/:name" component={AboutDetails} />
        </Route>
        <Route path="/blogs" component={BlogList}>
            <Route path="/blogs/:name" component={BlogDetails} />
        </Route>
    </Route>
);
