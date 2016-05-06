import React, { PropTypes, Component } from 'react';
import HeaderLinks from '../components/headerLinks';
import LanguagePicker from '../components/languagePicker';
import translate from '../hoc/translate';

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

export default translate('Header')(Header);