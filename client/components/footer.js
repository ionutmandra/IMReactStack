import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return (<footer className="row align-middle">
            <div className="copy large-15 large-offset-3 columns">© 2016. Adaptabi. All rights reserved.</div>
            <ul className="large-6 columns end">
                <li><a target="_blank" href="http://linkedin.com">LinkedIn</a></li>
                <li><a target="_blank" href="http://facebook.com">Facebook</a></li>
                <li><a target="_blank" href="http://twitter.com">Twitter</a></li>
                <li><a target="_blank" href="http://plus.google.com">Google+</a></li>
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