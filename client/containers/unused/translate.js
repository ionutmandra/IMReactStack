import React from 'react';
import en from '../lang/en';
import ro from '../lang/ro';

const languages = { en, ro };

export default (key) => { 
    return Component => {
        class TranslationComponent extends React.Component {
            render() {
                const lang = this.context.currentLanguage,
                    strings = (languages[lang] || en)[key],
                    merged = Object.assign({}, this.props.strings, strings);
                return strings
                    ? <Component {...this.props} strings={merged} currentLanguage={lang} />
                    : <Component {...this.props} currentLanguage={lang} />;
            }
        }

        TranslationComponent.contextTypes = {
            currentLanguage: React.PropTypes.string.isRequired,
        };
        
        return TranslationComponent;
    };
};