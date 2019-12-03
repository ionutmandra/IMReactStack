import React, { PropTypes, Component } from 'react';

class Home extends Component {
    render() {
        const s = this.props.strings;
        return <div>{s.welcome}</div>;
    }
}

Home.propTypes = {
    strings: PropTypes.object.isRequired,
};

Home.defaultProps = {
    strings: {
        welcome: 'WELCOME MESSAGE',
    },
};

export default Home;
