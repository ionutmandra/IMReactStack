import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return (<footer className="row align-middle">
            <div className="copy large-6 large-offset-3 medium-11 medium-offset-1 medium-order-1 large-order-1 small-18 small-offset-4 small-order-2 columns">© 2016. Adaptabi. All rights reserved.</div>
            <div className="large-6 large-offset-9 larger-order-2 medium-11 medium-order-2 small-22 small-offset-1 small-order-1 columns">
                <ul className="row end">
                    <li className="large-2 medium-5 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://www.linkedin.com/company/adaptabi"><i className="ncs-linkedin-square" /></a></li>
                    <li className="large-2 medium-5 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://www.facebook.com/Adaptabi-1562569510739468"><i className="ncs-facebook-square" /></a></li>
                    <li className="large-2 medium-5 medium-offset-1 small-4 small-offset-2"><a target="_blank" href="https://twitter.com/adaptabidev"><i className="ncs-twitter" /></a></li>
                    <li className="large-2 medium-5 medium-offset-0 small-4 small-offset-2"><a target="_blank" href="https://blog.adaptabi.com"><i className="ncs-medium" /></a></li>
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