import React, { PropTypes, Component } from 'react';

class Footer extends Component {
    render() {
        const s = this.props.strings;
        return <footer className="site-footer">{s.copyright}</footer>;
    }
}

Footer.propTypes = {
    strings: PropTypes.object.isRequired,
};

Footer.defaultProps = {
    strings: {
        copyright: 'COPYRIGHT TEXT',
    },
};

export default Footer;