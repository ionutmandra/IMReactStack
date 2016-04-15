import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class TranslationProvider extends Component {
    getChildContext() {
        return {
            currentLanguage: this.props.currentLanguage,
        };
    }
    render() {
        return <div {...this.props}>{this.props.children}</div>;
    }
}

TranslationProvider.propTypes = {
    children: PropTypes.node,
};

TranslationProvider.childContextTypes = {
    currentLanguage: PropTypes.string.isRequired,
};

const stateToProps = state => ({
    currentLanguage: state.lang.current,
});

export default connect(stateToProps)(TranslationProvider);