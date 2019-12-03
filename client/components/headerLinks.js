import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class HeaderLinks extends Component {
    render() {
        var s = this.props.strings;
        return (<nav className="header-links">
            <ul>
                <li><Link to={routePaths.client.root} activeClassName="active">{s.home}</Link></li>
                {/*<li><Link to={"/about"}>{s.about}</Link></li>*/}
                <li><Link to={routePaths.client.services} activeClassName="active">{s.services}</Link></li>
                <li><Link to={routePaths.client.projects} activeClassName="active">{s.projects}</Link></li>
                <li><Link to={routePaths.client.team.index} activeClassName="active">{s.team}</Link></li>
                <li><Link to={routePaths.client.contact} activeClassName="active">{s.contact}</Link></li>
            </ul>
        </nav>);
    }
}

HeaderLinks.propTypes = {
    strings: PropTypes.object.isRequired,
};

HeaderLinks.defaultProps = {
    strings: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        services: 'Services',
        team: 'Team',
    },
};

export default HeaderLinks;