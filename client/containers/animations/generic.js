import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), $body = $('body'), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////

export function appear(ref, callback) {
    let elements = extractDOMElements(ref);
    elements.image && TweenMax.set(elements.image, { scale: 1.2 });
    TweenMax.set(elements.container, { opacity: 0 });
    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; } })
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}

////
//    HEADER
/////////////////////////////////////////

export function large_enter_header(ref, callback, transition) {
    if (!transition.column || !transition.target) { return callback(); }
    //Setup vars
    let elements = extractDOMElements(ref, transition.column),
        width = $window.width(),
        height = $window.height(),
        $target = $(transition.target),
        left = elements.left,
        arr1 = [left, width - left],
        arr2 = Object.assign([0, 0], {
            ease: Power3.easeIn, onUpdate: () => {
                TweenMax.set(elements.header, { left: arr1[0], right: arr1[1] });
                TweenMax.set(elements.container, { left: -arr1[0] });
            },
        });
    //Initial state
    elements.$article.addClass('overlap');
    elements.$link.addClass('hover');
    $target.addClass('hover line');

    TweenMax.set(elements.header, { left: arr1[0], right: arr1[1], height: height });
    TweenMax.set(elements.container, { left: -arr1[0], width: width });
    TweenMax.set(elements.gridLine, { left: left, opacity: 1, height: 0 });

    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });

    //Animation
    let timeline = new TimelineLite({ onComplete })
        //wait for leaving page to hide content
        .set({}, {}, .6)
        //animate line
        .add(TweenMax.to(elements.gridLine, .6, { height: '100%', ease: Power3.easeOut }))
        //hide line
        .add(() => {
            $target.removeClass('line');
            TweenMax.set(elements.gridLine, { opacity: 0 });
        })
        //reveal new header
        .add(TweenMax.to(arr1, .6, arr2))
        //reveal new content
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            //these start in the middle (see delay)
            elements.text && TweenMax.to(elements.text, .3, {
                x: '0%', ease: Power3.easeOut, delay: .3,
                onStart: () => {
                    $target.removeClass('hover');
                    elements.$link.removeClass('hover');
                    elements.$article.removeClass('overlap');
                },
            }),
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, delay: .3, ease: Power3.easeOut }),
        ]));

    function onComplete() {
        TweenMax.set(elements.container, { clearProps: 'width,left' });
        TweenMax.set(elements.header, { clearProps: 'height' });
        TweenMax.set(elements.footer, { clearProps: 'height' });
        callback();
        timeline = null;
    }
}

export function medium_enter_header(ref, callback, transition) {
    console.error('medium_enter_header should NEVER be called');
    callback();
}

export function small_enter_header(ref, callback, transition) {
    console.error('small_enter_header should NEVER be called');
    callback();
}

export function large_leave_header(ref, callback, transition, initialScroll) {
    let elements = extractDOMElements(ref, transition.column), height = $window.height();

    let timeline = new TimelineLite({ onComplete: () => { setTimeout(callback, 0); timeline = null; } })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%', ease: Power3.easeIn }),
            elements.footer && TweenMax.set(elements.footer, { height: 0, ease: Power3.easeIn }),
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%', ease: Power3.easeIn }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: 1.1, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15,
                onComplete: () => {
                    $.scrollLock(false, false);
                    $.scrollLock(true);
                }}),
        ]));
}

export function medium_leave_header(ref, callback, transition, initialScroll) {
    console.error('medium_leave_header should NEVER be called');
    callback();
}

export function small_leave_header(ref, callback, transition, initialScroll) {
    console.error('small_leave_header should NEVER be called');
    callback();
}

////
//    BURGER
/////////////////////////////////////////

export function large_enter_burger(ref, callback, transition) {
    if (!transition.column || !transition.target) { return callback(); }
    //Setup vars
    let elements = extractDOMElements(ref, transition.column),
        width = $window.width(),
        height = $window.height(),
        $target = $(transition.target),
        left = elements.left,
        arr1 = [left, width - left],
        arr2 = Object.assign([0, 0], {
            ease: Power3.easeIn, onUpdate: () => {
                TweenMax.set(elements.header, { left: arr1[0], right: arr1[1] });
                TweenMax.set(elements.container, { left: -arr1[0] });
            },
        });

    //Setup
    elements.$gridLine.addClass('burger');
    elements.$article.addClass('overlap');

    //Initial state
    TweenMax.set(elements.header, { left: arr1[0], right: arr1[1], height: height });
    TweenMax.set(elements.container, { left: -arr1[0], width: width });
    TweenMax.set(elements.gridLine, { left: left, opacity: 1, height: 0 });

    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.logoImg && TweenMax.set(elements.logoImg, { color: '#fefefe' });    
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    elements.contentItems && TweenMax.set(elements.contentItems, { x: '-105%' });
    
    //Animation
    let timeline = new TimelineLite({ onComplete })
        //wait for burger links to hide
        .set({}, {}, .3)
        //animate line
        .add(TweenMax.to(elements.gridLine, .6, { height: '100%', ease: Power3.easeOut }))
        //hide line
        .add(() => {
            $target.removeClass('line');
            TweenMax.set(elements.gridLine, { opacity: 0 });
        })
        //reveal new header
        .add(TweenMax.to(arr1, .6, arr2))
        //reveal new content
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            //these start in the middle (see delay)
            elements.text && TweenMax.to(elements.text, .3, {
                x: '0%', ease: Power3.easeOut, delay: .3,
                onStart: () => {
                    $target.removeClass('hover');
                    elements.$link.removeClass('hover');
                    elements.$article.removeClass('overlap');
                },
            }),
            TweenMax.to(elements.links, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, delay: .3, ease: Power3.easeOut }),
        ]));

    function onComplete() {
        TweenMax.set(elements.container, { clearProps: 'width,left' });
        TweenMax.set(elements.header, { clearProps: 'height' });
        TweenMax.set(elements.footer, { clearProps: 'height' });
        elements.$gridLine.removeClass('burger');
        callback();
        timeline = null;
    }
}

export function medium_enter_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_enter_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function large_leave_burger(ref, callback, transition, initialScroll) {
    let elements = extractDOMElements(ref, transition.column);

    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; }})
        .add(_.filter([
            TweenMax.to(elements.links, .6, { x: '-100%', ease: Power3.easeIn,
                onComplete: () => {
                    $.scrollLock(false, false); //scroll goes top
                    $.scrollLock(true);
                }}),
        ]))
        .set({}, {}, 1.5);
}

export function medium_leave_burger(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_leave_burger(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

////
//    CONTENT
/////////////////////////////////////////

export function large_enter_content(ref, callback, transition) {
    if (!transition.column || !transition.target) { return callback(); }
    //Setup vars
    let elements = extractDOMElements(ref, transition.column),
        width = $window.width(),
        height = $window.height(),
        left = elements.left,
        arr1 = [left, width - left],
        arr2 = Object.assign([0, 0], {
            ease: Power3.easeIn, onUpdate: () => {
                TweenMax.set(elements.header, { left: arr1[0], right: arr1[1] });
                TweenMax.set(elements.container, { left: -arr1[0] });
            },
        });
    //Initial state
    elements.$article.removeClass('fix-header').addClass('overlap');

    TweenMax.set(elements.header, { left: arr1[0], right: arr1[1], height: height });
    TweenMax.set(elements.container, { left: -arr1[0], width: width });
    TweenMax.set(elements.gridLine, { left: left, opacity: 1, height: 0 });

    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.logoImg && TweenMax.set(elements.logoImg, { color: '#fefefe' });
    elements.burger && TweenMax.set(elements.burger, { x: '-100%' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });

    //Animation
    let timeline = new TimelineLite({ onComplete })
        //wait for leaving page to hide content
        .set({}, {}, .6)
        //animate line
        .add(TweenMax.to(elements.gridLine, .6, { height: '100%', ease: Power3.easeOut }))
        //hide line
        .add(() => {
            TweenMax.set(elements.gridLine, { opacity: 0 });
        })
        //reveal new header
        .add(TweenMax.to(arr1, .6, arr2))
        //reveal new content
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            //these start in the middle (see delay)
            elements.text && TweenMax.to(elements.text, .3, {
                x: '0%', ease: Power3.easeOut, delay: .3,
                onStart: () => {
                    elements.$article.removeClass('overlap');
                },
            }),
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.links && TweenMax.to(elements.links, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.logoText && TweenMax.to(elements.logoText, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, delay: .3, ease: Power3.easeOut }),
        ]));

    function onComplete() {
        TweenMax.set(elements.container, { clearProps: 'width,left' });
        TweenMax.set(elements.header, { clearProps: 'height' });
        TweenMax.set(elements.footer, { clearProps: 'height' });
        callback();
        timeline = null;
    }
}

export function medium_enter_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENDTED');
    callback();
}

export function small_enter_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENDTED');
    callback();
}

export function large_leave_content(ref, callback, transition, initialScroll) {
    let elements = extractDOMElements(ref, transition.column);
    elements.$article.addClass('fix-header');
    let height = $window.height(),
        initialHeight = 400 - initialScroll;
    initialHeight < 0 && (initialHeight = 0);
    TweenMax.set(elements.header, { height: initialHeight });

    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; } })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%', ease: Power3.easeIn }),
            elements.footer && TweenMax.to(elements.footer, .3, { height: 0, ease: Power3.easeIn }),
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%', ease: Power3.easeIn }),
            elements.burger && TweenMax.to(elements.burger, .3, { x: '-100%', ease: Power3.easeIn }),
            elements.logoImg && TweenMax.to(elements.logoImg, .3, { color: '#fefefe', ease: Power3.easeIn }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: 1.1, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15,
                onComplete: () => {
                    $.scrollLock(false, false); //scroll goes top
                    $.scrollLock(true);
                }}),
        ]));
}

export function medium_leave_content(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENDTED by Doru');
    callback();
}

export function small_leave_content(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENDTED by Doru');
    callback();
}

////
// HOME CONTENT
/////////////////////////////////////////

//called when user left from homepage via a content link (and comes to generic page)
export function large_enter_home_content(ref, callback, transition) {

    if (!transition.column || !transition.target) {
        return callback();
    }


    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);
    //.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        }
    });
    //$window.scrollTop(0);
    //$body.css('overflow', 'hidden');

    $container.removeClass('fix-header');

    //Initial state
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;

            let urlParts = location.href.split('#');
            let $elementToScrollTo = urlParts.length === 2 ? $(['#', urlParts[1]].join('')) : '';

            if ($elementToScrollTo.length > 0) {
                TweenMax.to(window, .7, { scrollTo: { y: $elementToScrollTo.offset().top }, ease: Power3.easeOut });
            }


        }
    })
        .set({}, {}, 1) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        // .set({}, {}, 6)
        //.set(elements.header, { height: height });
        .add(_.filter([
            function () {
                elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
            }
        ]))
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%' }),
        ]))
        .add(_.filter([() => {
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function medium_enter_home_content(ref, callback, transition) {

    if (!transition.column || !transition.target) {
        return callback();
    }


    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);
    //.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        }
    });
    //$window.scrollTop(0);
    //$body.css('overflow', 'hidden');

    //Initial state
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .set({}, {}, 1) //wait for leaving page to hide content
        .add(function () {
            $body.css('overflow', 'hidden');
        })
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        // .set({}, {}, 6)
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([() => {
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function small_enter_home_content(ref, callback, transition) {

    if (!transition.column || !transition.target) {
        return callback();
    }


    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);
    //.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        }
    });
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');

    //Initial state
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .set({}, {}, 1) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        // .set({}, {}, 6)
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([() => {
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

////
//    UTILITIES
///////////////////////////////

function extractDOMElements(ref, column) {
    let $article = $(dom.findDOMNode(ref)),
        $li = column && $article.find('header nav ul li:nth-child(' + (column - 2) + ')'),
        $link = column && $li.find('a'), 
        $links = $article.find('header.main nav ul li a'),
        $gridLine = $('#page-grid .navigation-line'),
        $burger = $article.find('header.main .hamburger .open'),
        $logoText = $article.find('header.main a.logo .text svg'),
        $logoImg = $article.find('header.main a.logo .img');

    return {
        $article: $article,
        article: $article[0],
        container: $article.find('header.main > .container')[0],
        header: $article.find('header.main')[0],

        $links: $links,
        links: $links.toArray(),
        $link: $link,
        link: column && $link[0],
        $burger: $burger,
        burger: $burger[0],
        $logoText: $logoText,
        logoText: $logoText[0],
        $logoImg: $logoImg,
        logoImg: $logoImg[0],
        
        $gridLine: $gridLine,
        gridLine: $gridLine[0],
        left: column && $li.offset().left + 1, //in css links have -1 left margin so we compensate
        
        gradient: $article.find('header.main .gradient')[0],
        image: $article.find('header.main .image .img')[0],
        text: $article.find('header.main .text h1')[0],
        contentItems: $article.find('.content-item'),
        footer: $article.find('footer')[0],
    };
}
