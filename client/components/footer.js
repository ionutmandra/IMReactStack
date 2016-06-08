import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return (<footer className="row align-middle">
            <div className="copy large-15 large-offset-3 columns">© 2016. Adaptabi. All rights reserved.</div>
            <ul className="large-6 columns end">
                <li><a target="_blank" href="http://linkedin.com"><i className="ncs-linkedin-square "></i></a></li>
                <li><a target="_blank" href="http://facebook.com"><i className="ncs-facebook-square"></i></a></li>
                <li><a target="_blank" href="http://twitter.com"><i className="ncs-twitter"></i></a></li>
                <li><a target="_blank" href="http://plus.google.com"><i className="ncs-google-plus"></i></a></li>
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