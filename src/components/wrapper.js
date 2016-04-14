import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TranslationProvider from '../containers/translationProvider';
import { changeLanguage } from '../actions';
import languages from '../../lang/languages.json';

const stateToProps = state => ({
    currentLanguage: state.lang.current,
});

const dispatchToProps = dispatch => ({
    handleChange: event => dispatch(changeLanguage(event.target.value)),
});

class Wrapper extends Component {
    render() {
        var p = this.props;
        return (
            <TranslationProvider>
                <div className="wrapper">
                    <select value={p.currentLanguage} onChange={p.handleChange}>
                        {languages.map(lang =>
                            <option key={lang.value} value={lang.value}>{lang.name}</option>
                        )}
                    </select>
                    <h2>Super dnw app!</h2>
                    <Link to={"/"}>Home</Link>
                    {this.props.children}
                </div>
            </TranslationProvider>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(Wrapper);