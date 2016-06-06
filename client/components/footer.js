import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return (<footer className="row align-middle">
            <div className="copy large-15 large-offset-3 columns">© 2016. Adaptabi. All rights reserved.</div>
            <ul className="large-6 columns end">
                <li><Link to="http://linkedin.com">LinkedIn</Link></li>
                <li><Link to="http://facebook.com">Facebook</Link></li>
                <li><Link to="http://twitter.com">Twitter</Link></li>
                <li><Link to="http://plus.google.com">Google+</Link></li>
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