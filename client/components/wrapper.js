import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import TranslationProvider from '../containers/translationProvider';
import Header from '../containers/headerContainer';

class Wrapper extends Component {
    render() {
        var p = this.props;
        console.warn( location.pathname);
        return (<TranslationProvider className="barba-container">
            <Header />

            <div className="page-grid-wrap">
                <div className="page-grid">
                    <div className="page-grid-col-line"><div className="line-over"></div></div>
                    <div className="page-grid-col-line"><div className="line-over"></div></div>
                    <div className="page-grid-col-line"><div id="transition-line-3" className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div id="transition-line-4" className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div id="transition-line-5" className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div id="transition-line-6" className="line-over main-grid-col"></div></div>
                    <div className="page-grid-col-line"><div id="transition-line-7" className="line-over main-grid-col"></div></div>
                </div>
            </div>

            <div className="scrollmagic-pin-spacer">
                <ReactTransitionGroup component="div" className="page-container page-container-adtb">
                    {React.cloneElement(this.props.children, { key: location.pathname })}
                </ReactTransitionGroup>
            </div>
            
            <div className="page-content">
                &nbsp;
            </div>

            <div id="loader-">
            </div>
        </TranslationProvider>
        );
    }
}

export default Wrapper;