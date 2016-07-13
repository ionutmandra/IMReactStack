//Taken from https://gist.github.com/barneycarroll/6550066
//Adapted by Teo
$.scrollLock = ( function scrollLockClosure() {
    'use strict';

    var $html      = $( 'html' ),
        // State: unlocked by default
        locked     = false,
        $window = $(window),
        // State: scroll to revert to
        prevScroll = {
            scrollLeft : $window.scrollLeft(),
            scrollTop  : $window.scrollTop(),
        },
        prevHeight = $window.outerHeight(),
        // State: styles to revert to
        prevStyles = {},
        lockStyles = {
            'overflow-y' : 'scroll',
            'position'   : 'fixed',
            'width'      : '100%',
        };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    $window.on('resize', function() {
        if (!locked) { return; }
        var currentHeight = $window.outerHeight();
        if (currentHeight != prevHeight) {
            var newScroll = Math.round(prevScroll.scrollTop * currentHeight / prevHeight);
            newScroll < 0 && (newScroll = 0);
            $html.css('top', - newScroll  + 'px');
            prevScroll.scrollTop = newScroll;
            prevHeight = currentHeight;
        }
    });

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
            scrollLeft : $window.scrollLeft(),
            scrollTop  : $window.scrollTop(),
        };

        // ...and styles
        saveStyles();

        // Compose our applied CSS
        $.extend( appliedLock, lockStyles, {
            // And apply scroll state as styles
            'left' : - prevScroll.scrollLeft + 'px',
            'top'  : - prevScroll.scrollTop  + 'px',
        } );

        // Then lock styles...
        $html.css( appliedLock );

        // ...and scroll state
        $window
            .scrollLeft(0)
            .scrollTop(0);

        locked = true;
    }

    function unlock(restoreScroll) {
        // Duplicate execution will break DOM statefulness
        if( !locked ) {
            return;
        }

        // Revert styles
        $html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

        // Revert scroll values
        var left = restoreScroll === false ? 0 : prevScroll.scrollLeft;
        var top = restoreScroll === false ? 0 : prevScroll.scrollTop;
        
        $window
            .scrollLeft(left)
            .scrollTop(top);

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