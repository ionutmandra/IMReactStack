import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), $body = $('body'), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////

export function appear(ref, callback) {
    callback();
}

////
//    HEADER
/////////////////////////////////////////

//user clicked on homepage in header of a generic page
export function large_enter_header(ref, callback, transition, burgerIsOpen) {
    //Setup vars
    let elements = extractDOMElements(ref),
        currentSlide = 0,
        width = $window.width(),
        left = elements.gridLeft,
        arr1 = [left, width - left],
        arr2 = Object.assign([0, 0], {
            ease: Power3.easeIn, onUpdate: () => {
                TweenMax.set(elements.article, { left: arr1[0], right: arr1[1] });
                TweenMax.set(elements.container, { left: -arr1[0] });
            },
        });
    //Initial state
    elements.$article.addClass('overlap');

    TweenMax.set(elements.article, { left: arr1[0], right: arr1[1] });
    TweenMax.set(elements.container, { left: -arr1[0], width: width });
    TweenMax.set(elements.gridLine, { left: left, opacity: 1, height: 0 });
    TweenMax.set(elements.left[currentSlide], { x: '-100%' });
    TweenMax.set(elements.right[currentSlide], { x: '100%' });
    TweenMax.set(elements.bottom[currentSlide], { y: '200px' });
    TweenMax.set(elements.image[currentSlide], { scale: '1.2' });

    elements.logoImg && TweenMax.set(elements.logoImg, { color: '#fefefe' });
    elements.logoText && TweenMax.set(elements.logoText, { x: '0%' });
    elements.burger && TweenMax.set(elements.burger, { x: '-100%', color: '#fefefe' });

    //Animation
    let timeline = new TimelineLite({ onComplete })
        //wait for leaving page to hide content
        .set({}, {}, burgerIsOpen ? .3 : .6)
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
            TweenMax.to(elements.left[currentSlide], .6, { x: '0%', ease: Power3.easeOut }),
            TweenMax.to(elements.right[currentSlide], .6, { x: '0%', ease: Power3.easeOut }),
            TweenMax.to(elements.bottom[currentSlide], .6, { y: '0%', ease: Power3.easeOut }),
            TweenMax.to(elements.image[currentSlide], .6, { scale: '1', ease: Power3.easeOut }),
        ]));

    function onComplete() {
        TweenMax.set(elements.container, { clearProps: 'width,left' });
        TweenMax.set(elements.article, { clearProps: 'left,right' });
        elements.$article.removeClass('overlap');
        callback();
        timeline = null;
    }
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
    let elements = extractDOMElements(ref);
    $.scrollLock(false, false); //scroll goes top
    $.scrollLock(true);

    let currentSlide = Math.floor((initialScroll + 1) / $window.height());

    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; }})
        .add(_.filter([
            TweenMax.to(elements.left[currentSlide], .3, { x: '-100%', ease: Power3.easeIn }),
            TweenMax.to(elements.right[currentSlide], .3, { x: '100%', ease: Power3.easeIn }),
            TweenMax.to(elements.bottom[currentSlide], .3, { y: '200px', ease: Power3.easeIn }),
            TweenMax.to(elements.image[currentSlide], 1.8, { scale: '1.2', ease: Power3.easeIn }),
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

//user clicked on homepage in burger, now the homepage link in generic burger is disabled
export function large_enter_burger(ref, callback, transition) {
    // console.warn('TO BE IMPLEMENTED');
    // callback();
    large_enter_header(ref, callback, transition, true);
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
    //this happens when navigating from Contact page
    let elements = extractDOMElements(ref);
    $.scrollLock(false, false); //scroll goes top
    $.scrollLock(true);

    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; }})
        .add(_.filter([
            TweenMax.to(elements.contactPieces.large, .3, { x: '-100%', ease: Power3.easeIn }),
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
//    CONTENT - entering homepage from a generic page content link
/////////////////////////////////////////

//user clicked on homepage in generic page when scrolled; 
//the only difference is on the leaving page side, here it's the same as header navigation
export function large_enter_content(ref, callback, transition) {
    large_enter_header(ref, callback, transition);
}

export function medium_enter_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_enter_content(ref, callback, transition) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

////
// CONTENT LINKS - when leaving homepage
/////////////////////////////////////////

export function large_leave_home_content(ref, callback, transition, initialScroll) {
    let elements = extractDOMElements(ref);
    $.scrollLock(false, false); //scroll goes top
    $.scrollLock(true);

    let currentSlide = Math.floor((initialScroll + 1) / $window.height());

    let timeline = new TimelineLite({ onComplete: () => { callback(); timeline = null; }})
        .add(_.filter([
            TweenMax.to(elements.left[currentSlide], .3, { x: '-100%', ease: Power3.easeIn }),
            TweenMax.to(elements.right[currentSlide], .3, { x: '100%', ease: Power3.easeIn }),
            TweenMax.to(elements.bottom[currentSlide], .3, { y: '200px', ease: Power3.easeIn }),
            TweenMax.to(elements.image[currentSlide], 1.5, { scale: '1.2', ease: Power3.easeIn }),
        ]));
}

export function medium_leave_home_content(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

export function small_leave_home_content(ref, callback, transition, initialScroll) {
    console.warn('TO BE IMPLEMENTED');
    callback();
}

////
//    UTILITIES
///////////////////////////////

function extractDOMElements(ref) {
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
            $article.find('.slide-1.background .img').toArray(),
            $article.find('.slide-2.background .img').toArray(),
            $article.find('.slide-3.background .img').toArray(),
            $article.find('.slide-4.background .img').toArray(),
        ],

        gridLine: $('#page-grid .navigation-line')[0],
        gridLeft: $('#page-grid li:first-child').offset().left,
        container: $article.find('> .container')[0],

        contactPieces: {
            large: $article.find('header.main .contact .content').toArray(),
        },
        links: $article.find('header.main nav ul li a').toArray(),
        logoImg: $article.find('header.main a.logo .img')[0],
        logoText: $article.find('header.main a.logo .text svg')[0],
        burger: $article.find('header.main .hamburger .open')[0],
    };
}