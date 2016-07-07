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

    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let width = $window.width(), height = $window.height();
    let elements = extractDOMElements(ref, transition.column); 
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link).addClass('hover');
    let left = elements.left;
    var arr1 = [left, width - left];
    var arr2 = Object.assign([0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.header, { left: arr1[0], right: arr1[1] });
            TweenMax.set(elements.container, { left: -arr1[0] });
        },
    });


    //Initial state
    $window.scrollTop(0);
    $.scrollLock(true);
    elements.$article.addClass('overlap');
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);

    TweenMax.set(elements.header, { left: arr1[0], right: arr1[1], height: height });
    TweenMax.set(elements.container, { left: -arr1[0], width: width });

    TweenMax.set(elements.gridLine, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            $.scrollLock(false, false);
            callback();
            TweenMax.set(elements.container, { clearProps: 'width,left' });
            TweenMax.set(elements.header, { clearProps: 'height' });
            TweenMax.set(elements.footer, { clearProps: 'height' });
            timeline = null;
        },
    })
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(elements.gridLine, .6, { height: '100%', ease: Power3.easeIn }),
        ]))
        .add(() => {
            $target.removeClass('line'); 
            TweenMax.set(elements.gridLine, { opacity: 0 }); 
        })        
        .add(_.filter([
            //elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { 
                $target.removeClass('hover'); 
                $link.removeClass('hover');
                elements.$article.removeClass('overlap'); 
            }}),
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, delay: .3, ease: Power3.easeOut }),
        ]));
}

export function medium_enter_header(ref, callback, transition) {

    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link).addClass('hover');
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
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
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
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
          function(){
            elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
          }
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
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, ease: Power3.easeOut }),
        ]));
}

export function small_enter_header(ref, callback, transition) {

    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link).addClass('hover');
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
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
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
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
          function(){
            elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
          }
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
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, ease: Power3.easeOut }),
        ]));
}

export function large_leave_header(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $article = elements.$article.addClass('overlap under'),
        height = $window.height();

    //Setup

    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $article.removeClass('overlap under');
            TweenMax.set(elements.footer, { clearProps: 'height' });
            timeline = null;
        },
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%', ease: Power3.easeIn }),
            elements.text && TweenMax.to(elements.text, .2, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: height / 400, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]));
}

export function medium_leave_header(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();

    //Setup

    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%' }),
            elements.text && TweenMax.to(elements.text, .2, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: height / 400, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]));
}

export function small_leave_header(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();

    //Setup

    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%' }),
            elements.text && TweenMax.to(elements.text, .2, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: height / 400, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]));
}

////
//    BURGER
/////////////////////////////////////////

export function large_enter_burger(ref, callback, transition, enableScenes) {
    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap'), linksAnimation = [];
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);//.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let $line = $grid.find('.navigation-line'), line = $line[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        }
    });
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            //console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, .3, { x: '0%', ease: Power3.easeOut, delay: .3 }));
        });
    }
    //$body.css('overflow', 'visible');
    $.scrollLock(false, false);
    // $window.scrollTop(0);
    // $body.css('overflow', 'hidden');
    $.scrollLock(true);
    $line.addClass('burger');
    $container.removeClass('fix-header');
    $('html').css({ position: '', top: '' });

    //Initial state
    TweenPlugin.activate(['CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            TweenMax.set(link, { x: '-100%' });
        });
    }

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            $line.removeClass('burger');
            timeline = null;
        }
    })
        //.set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
            linksAnimation,
        ]))
        .add(_.filter([() => {
            //$body.css('overflow', 'visible');
            $.scrollLock(false);
            setTimeout(enableScenes, 100);
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function medium_enter_burger(ref, callback, transition, enableScenes) {
    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');//, linksAnimation = [];
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);//.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let $line = $grid.find('.navigation-line'), line = $line[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        },
    });
    // if (elements.links && elements.links.length) {
    //     elements.links.each((index, link) => {
    //         //console.warn('each', link);
    //         linksAnimation.push(TweenMax.to(link, .3, { x: '0%', ease: Power3.easeOut, delay: .3 }));
    //     });
    // }
    // $body.css('overflow', 'visible');
    // $window.scrollTop(0);
    $.scrollLock(false, false);
    $.scrollLock(true);
    //$body.css('overflow', 'hidden');
    $line.addClass('burger');
    $container.removeClass('fix-header');
    $('html').css({ position: '', top: '' });

    //Initial state
    TweenPlugin.activate(['CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    // if (elements.links && elements.links.length) {
    //     elements.links.each((index, link) => {
    //         TweenMax.set(link, { x: '-100%' });
    //     });
    // }

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            $line.removeClass('burger');
            timeline = null;
        }
    })
        //.set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
            //linksAnimation,
        ]))
        .add(_.filter([() => {
            //$body.css('overflow', 'visible');
            $.scrollLock(false);
            setTimeout(enableScenes, 100);
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function small_enter_burger(ref, callback, transition, enableScenes) {
    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');//, linksAnimation = [];
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);//.addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let $line = $grid.find('.navigation-line'), line = $line[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        }
    });
    // if (elements.links && elements.links.length) {
    //     elements.links.each((index, link) => {
    //         //console.warn('each', link);
    //         linksAnimation.push(TweenMax.to(link, .3, { x: '0%', ease: Power3.easeOut, delay: .3 }));
    //     });
    // }
    // $body.css('overflow', 'visible');
    // $window.scrollTop(0);
    $.scrollLock(false, false);
    $.scrollLock(true);
    //$body.css('overflow', 'hidden');
    $line.addClass('burger');
    $container.removeClass('fix-header');
    $('html').css({ position: '', top: '' });

    //Initial state
    TweenPlugin.activate(['CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    // if (elements.links && elements.links.length) {
    //     elements.links.each((index, link) => {
    //         TweenMax.set(link, { x: '-100%' });
    //     });
    // }

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            $line.removeClass('burger');
            timeline = null;
        }
    })
        //.set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
            //linksAnimation,
        ]))
        .add(_.filter([() => {
            //$body.css('overflow', 'visible');
            $.scrollLock(false);
            setTimeout(enableScenes, 100);
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function large_leave_burger(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container),//.addClass('overlap'),
        height = $window.height(), linksAnimation = [];

    //Setup
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            //console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, 1, { x: '-100%' }));
        });
    }
    $container.find('.contact-container .contact .content').each((index, contact) => {
        //console.warn('each2', contact);
        linksAnimation.push(TweenMax.to(contact, 1, { x: '-100%' }));
    });

    //Initial state
    TweenMax.set(elements.header, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.header).css('z-index', 2);
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(linksAnimation)
        .set({}, {}, 1.2);
}

export function medium_leave_burger(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container),//.addClass('overlap'),
        height = $window.height(), linksAnimation = [];

    //Setup
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            //console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, 1, { x: '-100%' }));
        });
    }
    $container.find('.contact-container .contact .content').each((index, contact) => {
        //console.warn('each2', contact);
        linksAnimation.push(TweenMax.to(contact, 1, { x: '-100%' }));
    });

    //Initial state
    TweenMax.set(elements.header, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.header).css('z-index', 2);
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(linksAnimation)
        .set({}, {}, 1.2);
}

export function small_leave_burger(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container),//.addClass('overlap'),
        height = $window.height(), linksAnimation = [];

    //Setup
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            //console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, 1, { x: '-100%' }));
        });
    }
    $container.find('.contact-container .contact .content').each((index, contact) => {
        //console.warn('each2', contact);
        linksAnimation.push(TweenMax.to(contact, 1, { x: '-100%' }));
    });

    //Initial state
    TweenMax.set(elements.header, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.header).css('z-index', 2);
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(linksAnimation)
        .set({}, {}, 1.2);
}

////
//    CONTENT
/////////////////////////////////////////

export function large_enter_content(ref, callback, transition, enableScenes) {

    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let elements = extractDOMElements(ref, transition.column), $container = $(elements.container).addClass('overlap');
    let $target = $(transition.target).addClass('hover line');
    let $link = $(elements.link);
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

    $container.removeClass('fix-header');

    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    elements.header && TweenMax.set(elements.header, { height: height, display:'none' });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .set({}, {}, 2.05) //wait for leaving page to hide content
        .add(function () {$body.css('overflow', 'hidden');})
        .add(_.filter([
            TweenMax.to(line, 0.6, { height: '100%', ease: Power3.easeIn, delay: .3,
            onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(TweenMax.set(elements.header, {display:'block'}))
        .add(TweenMax.to(arr1, 1.6, arr2))
        .add(_.filter([
          function(){
            elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
          }
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .8, { scale: 1, ease: Power3.easeOut, delay: .2 }),
            elements.header && TweenMax.to(elements.header, .8, { height: 400, ease: Power3.easeOut,  delay: .2 }),
        ]))
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%' }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([() => {
            $body.css('overflow', 'visible');
            setTimeout(enableScenes, 100);
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function medium_enter_content(ref, callback, transition) {

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

    console.log('enter content ', elements.contentItems);

    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    //ements.header && TweenMax.set(elements.header, { height: height });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .set({}, {}, 2.05) //wait for leaving page to hide content
        .set(elements.header, { height: height })
        .add(function () {
            $body.css('overflow', 'hidden');
        })
        .add(_.filter([
            TweenMax.to(line, 0.6, { height: '100%', ease: Power3.easeIn, delay: .3, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, 1.6, arr2),
        ]))
        .add(_.filter([
          function(){
            elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
          }
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .8, { scale: 1, ease: Power3.easeOut, delay: .2 }),
            elements.header && TweenMax.to(elements.header, .8, { height: 400, ease: Power3.easeOut,  delay: .2 }),
        ]))
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%' }),
        ]))
        .add(_.filter([
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([() => {
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function small_enter_content(ref, callback, transition) {

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

    console.log('enter content ', elements.contentItems);

    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    //ements.header && TweenMax.set(elements.header, { height: height });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $(elements.header).css('height', '');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .set({}, {}, 2.05) //wait for leaving page to hide content
        .set(elements.header, { height: height })
        .add(function () {
            $body.css('overflow', 'hidden');
        })
        .add(_.filter([
            TweenMax.to(line, 0.6, { height: '100%', ease: Power3.easeIn, delay: .3, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, 1.6, arr2),
        ]))
        .add(_.filter([
          function(){
            elements.contentItems && TweenMax.set(elements.contentItems, { x: '-110%' });
          }
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .8, { scale: 1, ease: Power3.easeOut, delay: .2 }),
            elements.header && TweenMax.to(elements.header, .8, { height: 400, ease: Power3.easeOut,  delay: .2 }),
        ]))
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '0%' }),
        ]))
        .add(_.filter([
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); } }),
        ]))
        .add(_.filter([() => {
            $body.css('overflow', 'visible');
            $container.removeClass('overlap');
        }]))
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function large_leave_content(ref, callback, transition) {

    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();

    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%' }),
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%' })]))
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, 1.6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]))
        .set({}, {}, 4.55);
}

export function medium_leave_content(ref, callback, transition) {

    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();

    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //console.log('items to hide ',elements.contentItems );

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%' }),
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%' })]))
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, 1.6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]))
        .set({}, {}, 4.55);
}

export function small_leave_content(ref, callback, transition) {

    let elements = extractDOMElements(ref, transition.column),
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();

    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //console.log('items to hide ',elements.contentItems );

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            $(elements.footer).css('height', '');
            timeline = null;
        }
    })
        .add(_.filter([
            elements.contentItems && TweenMax.to(elements.contentItems, .3, { x: '-110%' }),
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%' })]))
        .add(_.filter([
            elements.header && TweenMax.to(elements.header, 1.6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]))
        .set({}, {}, 4.55);
}

////
// HOME CONTENT
/////////////////////////////////////////
export function large_enter_home_content(ref, callback, transition, enableScenes) {

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
    $body.css('overflow', 'hidden');

    $container.removeClass('fix-header');

    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
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

            if($elementToScrollTo.length > 0){
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
          function(){
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
            $body.css('overflow', 'visible');
            setTimeout(enableScenes, 100);
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
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
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
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
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

export function large_leave_home_content(ref, callback, transition) {
    large_leave_header(ref, callback, transition);
}
export function medium_leave_home_content(ref, callback, transition) {
    medium_leave_header(ref, callback, transition);
}
export function small_leave_home_content(ref, callback, transition) {
    small_leave_header(ref, callback, transition);
}

////
//    UTILITIES
///////////////////////////////

function extractDOMElements(ref, column) {
    let $article = $(dom.findDOMNode(ref)),
        $li = column && $article.find('header nav ul li:nth-child(' + (column - 2) + ')');

    return {
        $article: $article,
        article: $article[0],
        container: $article.find('header > .container')[0],
        link: column && $li.find('a')[0],
        links: column && $article.find('header nav ul li a'),
        header: $article.find('header.main')[0],
        footer: $article.find('footer')[0],
        image: $article.find('header.main .image .img')[0],
        text: $article.find('header .text h1')[0],
        gradient: $article.find('header .gradient')[0],
        contentItems: $article.find('.content-item'),
        gridLine: $('#page-grid .navigation-line')[0],
        left: column && $li.offset().left,
    };
}
