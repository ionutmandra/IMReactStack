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
    new TimelineLite({ onComplete: callback })
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}
    
////
//    HEADER
/////////////////////////////////////////

export function enter_header(ref, callback, transition) {
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
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');
    
    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height, display: 'none' });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    
    //Animation
    new TimelineLite({
        onComplete: () => { callback(); 
            $(elements.header).css('height', '');
            $(elements.footer).css('height', ''); 
        }})
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),            
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); }}),            
        ]))
        .add(_.filter([ () => { 
            $body.css('overflow', 'visible');              
            $container.removeClass('overlap');
        }]))            
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58, ease: Power3.easeOut }),
        ]));
}

export function leave_header(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column), 
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();
    
    //Setup
    
    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    
    
    //Animation
    new TimelineLite({ onComplete: () => { callback(); 
            $container.removeClass('overlap'); 
            $(elements.footer).css('height', '');
        }})
        .add(_.filter([
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: height / 400, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]));
}

////
//    BURGER
/////////////////////////////////////////

export function enter_burger(ref, callback, transition) {
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
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, .3, { x: '0%', ease: Power3.easeOut, delay: .3 }));
        });
    }
    $body.css('overflow', 'visible');
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');
    $line.addClass('burger');
    $container.removeClass('fix-header');
    $('html').css({ position: '', top: '' });

    //Initial state
    TweenPlugin.activate(['CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
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
    new TimelineLite({
        onComplete: () => { callback(); 
            $(elements.header).css('height', ''); 
            $(elements.footer).css('height', ''); 
            $line.removeClass('burger');
        }})
        //.set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        .add(_.filter([
            elements.header && TweenMax.set(elements.header, { display: 'block' }),    
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); }}),
            linksAnimation,                    
        ]))
        .add(_.filter([ () => { 
            $body.css('overflow', 'visible');              
            $container.removeClass('overlap');
        }]))    
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function leave_burger(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column), 
        $container = $(elements.container),//.addClass('overlap'),
        height = $window.height(), linksAnimation = [];
    
    //Setup
    if (elements.links && elements.links.length) {
        elements.links.each((index, link) => {
            console.warn('each', link);
            linksAnimation.push(TweenMax.to(link, 1, { x: '-100%' }));
        });
    }
    $container.find('.contact-container .contact .content').each((index, contact) => {
        console.warn('each2', contact);
        linksAnimation.push(TweenMax.to(contact, 1, { x: '-100%' }));
    });

    //Initial state
    TweenMax.set(elements.header, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });

    //Animation
    new TimelineLite({ onComplete: () => { callback(); 
            $container.removeClass('overlap'); 
            $(elements.header).css('z-index', 2); 
            $(elements.footer).css('height', ''); 
        }})
        .add(linksAnimation)
        .set({}, {}, 1.2);
}

////
//    CONTENT
/////////////////////////////////////////

export function enter_content(ref, callback, transition) {
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
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
     $window.scrollTop(0);
     $body.css('overflow', 'hidden');
    
    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    
    //Animation
    new TimelineLite({
        onComplete: () => { callback(); 
            $(elements.header).css('height', ''); 
            $(elements.footer).css('height', ''); 
        }})
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
        ]))
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); }}),
        ]))
        .add(_.filter([ () => { 
            $body.css('overflow', 'visible');              
            $container.removeClass('overlap');
        }]))    
        .add(_.filter([
            elements.footer && TweenMax.to(elements.footer, .3, { height: 58 }),
        ]));
}

export function leave_content(ref, callback, transition) {
    let elements = extractDOMElements(ref, transition.column), 
        $container = $(elements.container).addClass('overlap'),
        height = $window.height();
    
    //Setup
    
    //Initial state
    TweenMax.set(elements.container, { zIndex: 1 });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });    
    
    //Animation
    new TimelineLite({ onComplete: () => { callback(); 
        $container.removeClass('overlap'); 
        $(elements.footer).css('height', '');
    }})
        .add(_.filter([
            elements.text && TweenMax.to(elements.text, .3, { x: '-100%' }),
            elements.image && TweenMax.to(elements.image, 1.65, { scale: height / 400, ease: Power3.easeIn, delay: .15 }),
            elements.header && TweenMax.to(elements.header, .6, { height: height, ease: Power3.easeIn, delay: .15 }),
        ]));
        
        
}

////
// HOME CONTENT
/////////////////////////////////////////
export function enter_home_content(ref, callback, transition) {
    
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
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');
    
    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text && TweenMax.set(elements.text, { x: '-100%' });
    elements.image && TweenMax.set(elements.image, { scale: height / 400 });
    elements.header && TweenMax.set(elements.header, { height: height });
    elements.footer && TweenMax.set(elements.footer, { height: 0 });
    
    //Animation
    new TimelineLite({
        onComplete: () => { callback(); 
            $(elements.header).css('height', ''); 
            $(elements.footer).css('height', ''); 
        }})
        .set({}, {}, 1) //wait for leaving page to hide content                
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        // .set({}, {}, 6)
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
        ]))         
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, .6, { scale: 1, ease: Power3.easeOut }),
            elements.header && TweenMax.to(elements.header, .6, { height: 400, ease: Power3.easeOut }),
            elements.text && TweenMax.to(elements.text, .3, { x: '0%', ease: Power3.easeOut, delay: .3, onStart: () => { $target.removeClass('hover'); $link.removeClass('hover'); }}),
        ]))
        .add(_.filter([ () => { 
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
    let container = dom.findDOMNode(ref), $container = $(container);
    return {
        container: container,
        link: column && $container.find('header nav ul li:nth-child(' + (column - 2) + ') a')[0],
        links: column && $container.find('header nav ul li a'),
        header: $container.find('header.main')[0],
        footer: $container.find('footer')[0],
        image: $container.find('header.main .image .img')[0],
        text: $container.find('header .text h1')[0],
        gradient: $container.find('header .gradient')[0],
    };
}



