import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import TranslationProvider from '../containers/translationProvider';
import Grid from './grid';

class Wrapper extends Component {
    componentDidMount() {

$.scrollLock = ( function scrollLockClosure() {
    'use strict';

    var $html      = $( 'html' ),
        // State: unlocked by default
        locked     = false,
        // State: scroll to revert to
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        },
        // State: styles to revert to
        prevStyles = {},
        lockStyles = {
            'overflow-y' : 'scroll',
            'position'   : 'fixed',
            'width'      : '100%'
        };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
        var styleAttr = $html.attr( 'style' ),
            styleStrs = [],
            styleHash = {};

        if( !styleAttr ){
            return;
        }

        styleStrs = styleAttr.split( /;\s/ );

        $.each( styleStrs, function serializeStyleProp( styleString ){
            if( !styleString ) {
                return;
            }

            var keyValue = styleString.split( /\s:\s/ );

            if( keyValue.length < 2 ) {
                return;
            }

            styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
        } );

        $.extend( prevStyles, styleHash );
    }

    function lock() {
        var appliedLock = {};

        // Duplicate execution will break DOM statefulness
        if( locked ) {
            return;
        }

        // Save scroll state...
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        };

        // ...and styles
        saveStyles();

        // Compose our applied CSS
        $.extend( appliedLock, lockStyles, {
            // And apply scroll state as styles
            'left' : - prevScroll.scrollLeft + 'px',
            'top'  : - prevScroll.scrollTop  + 'px'
        } );

        // Then lock styles...
        $html.css( appliedLock );

        // ...and scroll state
        $( window )
            .scrollLeft( 0 )
            .scrollTop( 0 );

        locked = true;
    }

    function unlock(restoreScroll) {
        // Duplicate execution will break DOM statefulness
        if( !locked ) {
            return;
        }

        // Revert styles
        restoreScroll !== false && $html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

        // Revert scroll values
        restoreScroll !== false && $( window )
            .scrollLeft( prevScroll.scrollLeft )
            .scrollTop(  prevScroll.scrollTop );

        locked = false;
    }

    return function scrollLock( on, restoreScroll ) {
        // If an argument is passed, lock or unlock depending on truthiness
        if( arguments.length ) {
            if( on ) {
                lock();
            }
            else {
                unlock(restoreScroll);
            }
        }
        // Otherwise, toggle
        else {
            if( locked ){
                unlock(restoreScroll);
            }
            else {
                lock();
            }
        }
    };
}() );
        // $(window).on('scroll', event => {
        //     if (window.noScroll) {
        //         event = event.originalEvent || event;
        //     console.warn('scrolling', event);
        //         event.stopPropagation && event.stopPropagation();
        //         event.stopImmediatePropagation && event.stopImmediatePropagation();
        //         event.preventDefault && event.preventDefault();
        //         return false;
        //     }
        // });
        
        window.ReactLoaded = true;
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
