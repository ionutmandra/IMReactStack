import React, { PropTypes, Component } from 'react';
import HeaderLinks from '../containers/headerLinksContainer';
import LanguagePicker from '../containers/languagePickerContainer';

class Header extends Component {
    render() {
        const s = this.props.strings;
        return (
            <header className="main-header">
                <h3 className="logo">{s.siteName}</h3>
                <HeaderLinks />
                <LanguagePicker />
            </header>
        );
    }
}

Header.propTypes = {
    strings: PropTypes.object.isRequired,
};

Header.defaultProps = {
    strings: {
        siteName: 'SITE NAME',
    },
};

export default Header;