import React, { Component } from 'react';
import TranslationProvider from '../containers/translationProvider';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import Page from './page';

class Wrapper extends Component {
    render() {
        var p = this.props;
        return (<div className="barba-container">
            <div className="page-grid-wrap">
                <div className="page-grid">
                    <div className="page-grid-col-line"><div className="line-over"></div></div>
                    <div className="page-grid-col-line"><div className="line-over"></div></div>
                    <div className="page-grid-col-line"><div className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div className="line-over main-grid-col"></div></div>
                </div>
            </div>

            <div className="scrollmagic-pin-spacer">

                <TranslationProvider className="page-container page-container-adtb">
                    {this.props.children}
                    {/*<Page>{this.props.children}</Page>
                     <Footer /> */}
                </TranslationProvider>
            
            </div>


            <div className="page-content">
                &nbsp;
            </div>

            <Header />
        </div>
        );
    }
}

export default Wrapper;