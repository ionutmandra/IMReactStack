import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class HeaderLinks extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.transition({
            type: this.props.animationType || 'header',
            column: event.currentTarget.getAttribute('data-eq'),
            target: event.currentTarget,
        });
    }

    render() {
        var s = this.props.strings;
        return (<nav className="header-links">
            <ul>
                {/*data-eq attribute tells which grid line the link animates when navigating*/}
                <li><Link to={routePaths.client.root}       data-eq="3" className="about"       onClick={this.handleClick}>{s.about}</Link></li>
                <li><Link to={routePaths.client.services}   data-eq="4" className="expertise"   onClick={this.handleClick}>{s.expertise}</Link></li>
                <li><Link to={routePaths.client.projects}   data-eq="5" className="portfolio"   onClick={this.handleClick}>{s.portfolio}</Link></li>
                <li><Link to={routePaths.client.team.index} data-eq="6" className="jobs"        onClick={this.handleClick}>{s.jobs}</Link></li>
                <li><Link to={routePaths.client.contact}    data-eq="7" className="contact"     onClick={this.handleClick}>{s.contact}</Link></li>
            </ul>
        </nav>);
    }
}

HeaderLinks.propTypes = {
    animationType: PropTypes.string,
    strings: PropTypes.object.isRequired,
    transition: PropTypes.func.isRequired,
};

HeaderLinks.defaultProps = {
    strings: {
        about: 'About',
        expertise: 'Expertise',
        portfolio: 'Portfolio',
        contact: 'Contact',
        jobs: 'Careers',
    },
};

export default HeaderLinks;