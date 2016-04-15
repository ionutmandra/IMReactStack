import React, { Component } from 'react';
import languages from '../../lang/languages.json';
import { changeLanguage } from '../actions';
import { connect } from 'react-redux';

const stateToProps = state => ({
    currentLanguage: state.lang.current,
});

const actionsToProps = dispatch => ({
    handleChange: event => dispatch(changeLanguage(event.target.value)),
});

class LanguagePicker extends Component {
    render() {
        var p = this.props;
        return (
            <div className="language-picker">
                <select value={p.currentLanguage} onChange={p.handleChange}>
                    {languages.map(lang =>
                        <option key={lang.value} value={lang.value}>{lang.name}</option>
                    ) }
                </select>
            </div>
        );
    }
}

export default connect(stateToProps, actionsToProps)(LanguagePicker);