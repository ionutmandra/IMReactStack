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
            column: event.target.getAttribute('data-animate-line'),
            target: event.target,
        });
    }

    render() {
        return (<nav className="links">
            <ul>
                <li><Link data-animate-line="3" onClick={this.handleClick} to={routePaths.client.root}>{'About'}</Link></li>
                <li><Link data-animate-line="4" onClick={this.handleClick} to={routePaths.client.expertise}>{'Expertise'}</Link></li>
                <li><Link data-animate-line="5" onClick={this.handleClick} to={routePaths.client.portfolio}>{'Portfolio'}</Link></li>
                <li><Link data-animate-line="6" onClick={this.handleClick} to={routePaths.client.careers}>{'Careers'}</Link></li>
                <li><Link data-animate-line="7" onClick={this.handleClick} to={routePaths.client.contact}>{'Contact'}</Link></li>
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
    },
};

export default HeaderLinks;