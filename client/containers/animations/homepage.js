import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), $body = $('body'), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////

export function appear(ref, callback) {
    $body.removeClass('navigating');
    let container = dom.findDOMNode(ref), $container = $(container);
    let image = $container.find('.slide-1.background .img')[0];
    image && TweenMax.set(image, { scale: 1.4 });
    TweenMax.set(container, { opacity: 0 });
    let timeline = new TimelineLite({ onComplete: () => { timeline = null; callback(); } })
        .add(_.filter([
            image && TweenMax.to(image, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}

////
//    HEADER
/////////////////////////////////////////

//user clicked on homepage in header of a generic page
export function large_enter_header(ref, callback, transition) {
    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let container = dom.findDOMNode(ref), $container = $(container).addClass('overlap');
    let elements = {
        container: container,
        image: $container.find('.slide-1.background .img')[0],
        text1: $container.find('.slide-1.content .text-1 h1')[0],
        text2: $container.find('.slide-1.content .text-2 h2')[0],
        textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    let $target = $(transition.target).addClass('hover line');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        },
    });
    $window.scrollTop(0);
    $.scrollLock(true);

    //Initial state
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text1 && TweenMax.set(elements.text1, { x: '100%' });
    elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
    elements.textBottom && TweenMax.set(elements.textBottom, { y: '200%' });
    elements.image && TweenMax.set(elements.image, { scale: 1.4 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => {
            callback();
            $container.removeClass('overlap');
            timeline = null;
        },
    })
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
            elements.text1 && TweenMax.to(elements.text1, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.text2 && TweenMax.to(elements.text2, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.textBottom && TweenMax.to(elements.textBottom, .6, { y: '0%', ease: Power3.easeOut, delay: .5 }),
        ]));
}

export function medium_enter_header(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_enter_header(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

//user clicked on link in homepage header links
export function large_leave_header(ref, callback, transition, initialScroll) {
    let container = dom.findDOMNode(ref),
        $container = $(container),
        height = $window.height(),
        fullHeight = height * 4,
        scroll = $window.scrollTop();
    let slide = '.slide-' + Math.round((fullHeight - scroll) / fullHeight);
    let elements = {
        image: $container.find(slide + '.background .img')[0],
        text1: $container.find(slide + '.content .text-1 h1')[0],
        text2: $container.find(slide + '.content .text-2 h2')[0],
        textBottom: $container.find(slide + '.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    console.warn('LEAVE HOMEPAGE HEADER', elements.image);
    //Setup

    //Initial state
    TweenMax.set(container, { zIndex: 1 });

    //Animation
    let timeline = new TimelineLite({ onComplete: () => { callback(); $container.removeClass('overlap'); timeline = null; } })
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1.65, { scale: 2.4, ease: Power3.easeIn, delay: .15 }),
            elements.text1 && TweenMax.to(elements.text1, .3, { x: '100%' }),
            elements.text2 && TweenMax.to(elements.text2, .3, { x: '-100%' }),
            elements.textBottom && TweenMax.to(elements.textBottom, .3, { y: '200%' }),
        ]));
}

export function medium_leave_header(ref, callback, transition, initialScroll) {
    console.error('should never be called');
    callback();
}

export function small_leave_header(ref, callback, transition, initialScroll) {
    console.error('should never be called');
    callback();
}

////
//    BURGER
/////////////////////////////////////////

//user clicked on homepage in burger
export function large_enter_burger(ref, callback, transition) {
    if (!transition.column || !transition.target) {
        return callback();
    }

    //Setup
    let container = dom.findDOMNode(ref), $container = $(container).addClass('overlap');
    console.warn('extractDOMElements', ref, container);
    let elements = {
        container: container,
        image: $container.find('.slide-1.background .img')[0],
        text1: $container.find('.slide-1.content .text-1 h1')[0],
        text2: $container.find('.slide-1.content .text-2 h2')[0],
        textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    let $target = $(transition.target).addClass('hover line');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], {
        ease: Power3.easeIn, onUpdate: () => {
            TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
        },
    });
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');

    //Initial state
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)', clipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text1 && TweenMax.set(elements.text1, { x: '100%' });
    elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
    elements.textBottom && TweenMax.set(elements.textBottom, { y: '200%' });
    elements.image && TweenMax.set(elements.image, { scale: 1.4 });

    //Animation
    let timeline = new TimelineLite({
        onComplete: () => { callback(); $body.css('overflow', 'visible'); $container.removeClass('overlap'); timeline = null; },
    })
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); } }),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
            elements.text1 && TweenMax.to(elements.text1, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.text2 && TweenMax.to(elements.text2, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.textBottom && TweenMax.to(elements.textBottom, .6, { y: '0%', ease: Power3.easeOut, delay: .5 }),
        ]));
}

export function medium_enter_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_enter_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function large_leave_burger(ref, callback, transition) {
    let container = dom.findDOMNode(ref), $container = $(container).addClass('overlap'), height = $window.height(), fullHeight = height * 4, scroll = $window.scrollTop();
    let slide = '.slide-' + Math.round((fullHeight - scroll) / fullHeight);
    let elements = {
        image: $container.find(slide + '.background .img')[0],
        text1: $container.find(slide + '.content .text-1 h1')[0],
        text2: $container.find(slide + '.content .text-2 h2')[0],
        textBottom: $container.find(slide + '.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    console.warn('extractDOMElements', ref, container, height, fullHeight, scroll, slide, elements);

    //Setup

    //Initial state
    TweenMax.set(container, { zIndex: 1 });

    //Animation
    let timeline = new TimelineLite({ onComplete: () => { callback(); $container.removeClass('overlap'); timeline = null; } })
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1.65, { scale: 1.4, ease: Power3.easeIn, delay: .15 }),
            elements.text1 && TweenMax.to(elements.text1, .3, { x: '100%' }),
            elements.text2 && TweenMax.to(elements.text2, .3, { x: '-100%' }),
            elements.textBottom && TweenMax.to(elements.textBottom, .3, { y: '200%' }),
        ]));
}

export function medium_leave_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_leave_burger(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

////
// CONTENT LINKS
/////////////////////////////////////////

export function large_enter_home_content(ref, callback, transition) {
    console.error('should never be called');
    callback();
}
export function medium_enter_home_content(ref, callback, transition) {
    console.error('should never be called');
    callback();
}
export function small_enter_home_content(ref, callback, transition) {
    console.error('should never be called');
    callback();
}

export function large_leave_home_content(ref, callback, transition) {

    let container = dom.findDOMNode(ref), $container = $(container).addClass('overlap'), height = $window.height(), fullHeight = height * 4, scroll = $window.scrollTop();

    let slide = '.slide-' + Math.round((fullHeight - scroll) / fullHeight);

    //Initial state
    TweenMax.set(container, { zIndex: 1 });

    var animations = [];

    console.log(transition.animations);

    if (transition.animations) {

        transition.animations.leftHide && transition.animations.leftHide.forEach(function (element) {
            animations.push(TweenMax.to(element, 1, { x: '-100%' }));
        }, this);

        transition.animations.rightHide && transition.animations.rightHide.forEach(function (element) {
            animations.push(TweenMax.to(element, 1, { x: '+100%' }));
        }, this);

        transition.animations.bottomHide && transition.animations.bottomHide.forEach(function (element) {
            animations.push(TweenMax.to(element, 1, { y: '+200%' }));
        }, this);
    }

    //Animation
    let timeline = new TimelineLite({ onComplete: () => { callback(); $container.removeClass('overlap'); timeline = null; } })
        .add(animations)
        .set({}, {}, 2.2);

}

export function medium_leave_home_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_leave_home_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

////
//    UTILITIES
///////////////////////////////

function extractDOMElements(ref) {
    let container = dom.findDOMNode(ref), $container = $(container);
    return {
        container: container,
        image: $container.find('.slide-1.background .img')[0],
        text1: $container.find('.slide-1.content .text-1 h1')[0],
        text2: $container.find('.slide-1.content .text-2 h2')[0],
        textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
}

function extractLargeDOMElements(ref) {
    let article = dom.findDOMNode(ref), $article = $(article);

    return {
        article, $article,
        left: [
            $article.find('.slide-1.content .text-2 h2').toArray(),
            $article.find('.slide-2.content .text-1 h1, .slide-2.content .text-3 .text-content').toArray(),
            $article.find('.slide-3.content .text-2 h1').toArray(),
            $article.find('.slide-4.content .text-1 h1').toArray(),
        ],
        right: [
            $article.find('.slide-1.content .text-1 h1').toArray(),
            $article.find('.slide-2.content .text-2 .text-content').toArray(),
            $article.find('.slide-3.content .text-1 h1').toArray(),
            {},
        ],
        smallLeft: [
            $article.find('.slide-1.content .text-1 h1, .slide-1.content .text-2 h2').toArray(),
            $article.find('.slide-2.content .text-1 h1').toArray(),
            $article.find('.slide-3.content .text-1 h1, .slide-3.content .text-2 h1').toArray(),
            $article.find('.slide-4.content .text-1 h1').toArray(),
        ],
        bottom: [
            $article.find('.scroll-hint > *').toArray(),
            $article.find('.scroll-hint > *').toArray(),
            $article.find('.scroll-hint > *').toArray(),
            $article.find('.scroll-hint > *').toArray(),
        ],
        image: [
            $article.find('.slide-1.background .image').toArray(),
            $article.find('.slide-2.background .image').toArray(),
            $article.find('.slide-3.background .image').toArray(),
            $article.find('.slide-4.background .image').toArray(),
        ]
    };
}