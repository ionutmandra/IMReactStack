import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import TranslationProvider from '../containers/translationProvider';
import Grid from './grid';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window);

class Wrapper extends Component {
    componentDidMount() {       
        let media = this.getMedia();
        this.props.setMedia({
            current: media,
            prev: media,
        });
        $window.on('resize', (() => {
            let media = this.getMedia();
            media != this.props.ui.media.current 
                && this.props.setMedia({
                    current: media,
                    prev: this.props.ui.media.current,
                });
        }).bind(this));
        window.ReactLoaded = true;
    }

    getMedia() {
        let media = breakpoint.names.large, width = $window.outerWidth();
        width < breakpoint.large && (media = breakpoint.names.medium);
        width < breakpoint.medium && (media = breakpoint.names.small);
        return media;
    }

    render() {
        return (<TranslationProvider id="page-wrapper">
            <ReactTransitionGroup component="div" id="page-container">
                {React.cloneElement(this.props.children, { key: location.pathname })}
            </ReactTransitionGroup>
            <Grid />
        </TranslationProvider>);
    }
}

export default Wrapper;
