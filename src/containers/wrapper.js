import React, { Component } from 'react';
import TranslationProvider from '../containers/translationProvider';
import Header from './header';
import Page from './page';
import Footer from './footer';

class Wrapper extends Component {
    render() {
        var p = this.props, s = p.strings;
        return (
            <TranslationProvider className="site-wrapper">
                <Header />
                <Page>{this.props.children}</Page>
                <Footer />
            </TranslationProvider>
        );
    }
}

export default Wrapper;