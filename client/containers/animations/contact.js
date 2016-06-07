import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////
    
export function appear(ref, callback) {
    return callback();
    let elements = extractDOMElements(ref);
    elements.background && TweenMax.set(elements.background, { scale: 1.2 });
    TweenMax.set(elements.container, { opacity: 0 });
    let tl = new TimelineLite({ onComplete: callback })
        .add(_.filter([
            elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}
    
////
//    ENTER - navigation after first load
/////////////////////////////////////////

export function enter_header(ref, callback, transition) {
    return callback();
    if (!transition.column || !transition.target) {
        return callback();
    }
    
    //Setup
    let elements = extractDOMElements(ref);
    //console.warn('animate enter header SETUP', elements, transition);
    let $target = $(transition.target).addClass('hover');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $('#page-grid .navigation-line')[0];
    let width = $window.width();
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
    elements.text1 && TweenMax.set(elements.text1, { x: '-100%' });
    elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
    elements.textBottom && TweenMax.set(elements.textBottom, { y: '100%' });
    elements.background && TweenMax.set(elements.background, { scale: 1.2 });
    
    //Animation
    let tl1 = new TimelineLite({
        onComplete: () => { callback(); $('body').css('overflow', 'visible'); }})
        .add(_.filter([
            TweenMax.to(line, 1, {
                height: '100%', ease: Power3.easeIn, onComplete: () => {
                    TweenMax.set(line, { opacity: 0 });
                    $target.removeClass('hover');
                },
            }),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, 1, arr2),
        ]))
        .add(_.filter([
            elements.text1 && TweenMax.to(elements.text1, 1, { x: '0%', ease: Power3.easeOut }),
            elements.text2 && TweenMax.to(elements.text2, 1, { x: '0%', ease: Power3.easeOut }),
            elements.textBottom && TweenMax.to(elements.textBottom, 1, { y: '0%', ease: Power3.easeOut }),
            elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),
        ]));
}

////
//    LEAVE - page unload
/////////////////////////
    
export function leave_header(ref, callback, transition) {
    return callback();
    let elements = extractDOMElements(ref);
    
    //Setup
    
    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    
    //Animation
    let tl1 = new TimelineLite({ onComplete: callback })
        .add(_.filter([
            elements.text1 && TweenMax.to(elements.text1, 1, { x: '-100%' }),
            elements.text2 && TweenMax.to(elements.text2, 1, { x: '-100%' }),
            elements.textBottom && TweenMax.to(elements.textBottom, 1, { y: '100%' }),
            elements.background && TweenMax.to(elements.background, 2, { scale: 1.2, ease: Power3.easeIn }),
        ]))
        .set({}, {}, 2); //delay before firing onComplete, to sync with _enter
}

////
//    PRIVATE UTILITY FUNCTIONS
///////////////////////////////

function extractDOMElements(ref) {
    let container = dom.findDOMNode(ref), $container = $(container);
    console.warn('extractDOMElements', $container);
    return {
        container: container,
        background: $container.find('.image-container img')[0],
        text1: $container.find('.text-1 h1')[0],
        gradient: $container.find('.gradient')[0],
    };
}