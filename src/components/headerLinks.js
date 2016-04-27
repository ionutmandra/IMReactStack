import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import translate from '../hoc/translate';

class HeaderLinks extends Component {
    render() {
        var s = this.props.strings;
        return (<nav className="header-links">
            <ul>
                <li><Link to={"/"}>{s.home}</Link></li>
                <li><Link to={"/about"}>{s.about}</Link></li>
                <li><Link to={"/projects"}>{s.projects}</Link></li>
                <li><Link to={"/contact"}>{s.contact}</Link></li>
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
    },
};

export default translate('HeaderLinks')(HeaderLinks);