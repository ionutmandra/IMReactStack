import React, { Component } from 'react';
import languages from '../lang/languages.json';

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

export default LanguagePicker;