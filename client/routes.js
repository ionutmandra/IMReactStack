/*
This is the "sitemap" of the client side of our app!
*/

import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import routePaths from '../common/routePaths';

import requireAuthentication from './containers/authenticatedContainer';

import Home from './containers/homeContainer';
import AdminHome from './containers/adminHomeContainer';
import { component as AboutList } from './containers/aboutListContainer';
import LoginComponent from './containers/loginContainer';
import AboutDetails from  './containers/aboutDetailsContainer';
import ContactPage from './containers/contactContainer';
import GalleryExample from './components/galleryExample';
import GridsPage from './components/gridsPage';
import ProjectsList from './containers/projectsListContainer';
import ServicesList from './containers/servicesContainer';
import ProjectDetails from './containers/projectDetailsContainer';
import Team from './containers/teamContainer';
import Members from './containers/membersContainer';
import MemberDetails from './containers/memberDetailsContainer';
import Culture from './containers/cultureContainer';
import Gallery from './containers/galleryContainer';
import Wrapper from './components/wrapper';
import Gsap from './containers/gsap';
import GsapReact from './containers/gsapReact';

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
            {/*<Route path={routePaths.client.team.index} component={Team}>
                <IndexRedirect to={routePaths.client.team.culture} />
                <Route path={routePaths.client.team.culture} component={Culture} />
                <Route path={routePaths.client.team.members} component={Members}>
                    <Route path={routePaths.client.team.memberDetails} component={MemberDetails} />
                </Route>
                <Route path={routePaths.client.team.gallery} component={Gallery} />
            </Route>*/}
            <Route path={routePaths.client.team.index} component={Team} />
            <Route path={routePaths.client.contact} component={ContactPage} />
            <Route path={routePaths.client.gallery} component={GalleryExample} />
        </Route>
        <Route path={routePaths.client.lists} component={GridsPage} />
        <Route path={routePaths.client.gsap} component={Gsap} />
        <Route path={routePaths.client.gsapr} component={GsapReact} />
        <div>
            <Route path={routePaths.client.admin} component={LoginComponent} />
            <Route path={routePaths.client.adminHome} component={requireAuthentication(AdminHome) } />
        </div>
    </div>
);
