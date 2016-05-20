import React, { Component } from 'react';
import TranslationProvider from '../containers/translationProvider';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import Page from './page';

class Wrapper extends Component {
    render() {
        var p = this.props;
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