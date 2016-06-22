import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return (<footer className="row align-middle">
            <div className="copy large-15 large-offset-3 columns">© 2016. Adaptabi. All rights reserved.</div>
            <ul className="large-6 columns end">
                <li><a target="_blank" href="https://www.linkedin.com/company/adaptabi"><i className="ncs-linkedin-square" /></a></li>
                <li><a target="_blank" href="https://www.facebook.com/Adaptabi-1562569510739468"><i className="ncs-facebook-square" /></a></li>
                <li><a target="_blank" href="https://twitter.com/adaptabidev"><i className="ncs-twitter" /></a></li>
            </ul>
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