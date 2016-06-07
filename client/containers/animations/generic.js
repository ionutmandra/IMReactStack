import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////
    
export function appear(ref, callback) {
    let elements = extractDOMElements(ref);
    console.warn('generic appear', elements);
    elements.image && TweenMax.set(elements.image, { scale: 1.2 });
    TweenMax.set(elements.container, { opacity: 0 });
    new TimelineLite({ onComplete: callback })
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}
    
////
//    ENTER - navigation after first load
/////////////////////////////////////////

export function enter_header(ref, callback, transition) {
    if (!transition.column || !transition.target) {
        return callback();
    }
    
    //Setup
    let elements = extractDOMElements(ref), $container = $(elements.container).addClass('detach-header');
    //console.warn('animate enter header SETUP', elements, transition);
    let $target = $(transition.target).addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $('#page-grid .navigation-line')[0];
    let width = $window.width(), height = $window.height();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
    $window.scrollTop(0);
    $('body').css('overflow', 'hidden');
    
    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    
    //Animation
    new TimelineLite({
        onComplete: () => { callback(); $('body').css('overflow', 'visible'); $container.removeClass('detach-header'); }})
        .set({}, {}, .35) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, 1, { height: '100%', ease: Power3.easeIn, onComplete: () => { TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, 1, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, 1, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .35, { x: '0%', ease: Power3.easeOut, delay: .65, onStart: () => { $target.removeClass('hover'); } }),
        ]))
        .add(_.filter([
        ]));
}

////
//    LEAVE - page unload
/////////////////////////
    
export function leave_header(ref, callback, transition) {
    let elements = extractDOMElements(ref), 
        $container = $(elements.container).addClass('detach-header'),
        height = $window.height();
    
    //Setup
    
    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    
    //Animation
    new TimelineLite({ onComplete: () => { callback(); $container.removeClass('detach-header'); }})
        .add(_.filter([
            elements.text && TweenMax.to(elements.text, .35, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 2.5, { scale: height / 400, ease: Power3.easeIn }),
            elements.header && TweenMax.to(elements.header, 1, { height: height, ease: Power3.easeIn }),
        ]))
        .set({}, {}, 2.35); //delay before firing onComplete, to sync with _enter
}

////
//    PRIVATE UTILITY FUNCTIONS
///////////////////////////////

function extractDOMElements(ref) {
    let container = dom.findDOMNode(ref), $container = $(container);
    console.warn('extractDOMElements', $container);
    return {
        container: container,
        header: $container.find('header.main')[0],
        image: $container.find('header.main .image .img')[0],
        text: $container.find('header .text h1')[0],
        gradient: $container.find('header .gradient')[0],
    };
}