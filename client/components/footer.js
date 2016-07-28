import React, { PropTypes, Component } from 'react';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.handleCallToActionClick = this.handleCallToActionClick.bind(this);
    }

    handleCallToActionClick(event) {
        this.props.dispatchTransition({
            type: 'content',
            column: 6,
            target: event.target,
        });
    }

    renderCTA() {
        if (!this.props.disableCareersLink) {
            return (<Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}><span>Careers</span></Link>);
        }
        return '';
    }

    render() {
        return (<footer className="row align-middle">
            <div className="copy large-9 large-offset-3 medium-14 medium-offset-1 medium-order-1 large-order-1 small-24 small-offset-0 small-order-2 columns">
                © 2016 Adaptabi. All rights reserved. {this.renderCTA()}
            </div>
            <div className="large-6 large-offset-6 larger-order-2 medium-8 medium-order-2 small-22 small-offset-1 small-order-1 columns">
                <ul className="row end">
                    <li className="large-2 medium-6 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://www.linkedin.com/company/adaptabi"><i className="ncs-linkedin-square" /></a></li>
                    <li className="large-2 medium-6 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://www.facebook.com/adaptabi/"><i className="ncs-facebook-square" /></a></li>
                    <li className="large-2 medium-6 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://twitter.com/adaptabidev"><i className="ncs-twitter" /></a></li>
                    <li className="large-2 medium-6 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://blog.adaptabi.com"><i className="ncs-medium" /></a></li>
                </ul>
            </div>
        </footer>);
    }
}

Footer.propTypes = {
    strings: PropTypes.object.isRequired,
};

Footer.defaultProps = {
    strings: {
    },
};

export default Footer;