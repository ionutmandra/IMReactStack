import React, { PropTypes } from 'react';
import dom from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

const stateToProps = state => ({
    transition: state.transition,
});

export default (BaseComponent) => {
    //fool eslint to stop underlining globals
    let $ = window.$, TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

    let $window = $(window);

    BaseComponent.propTypes = {
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps)(BaseComponent);

    class TransitionComponent extends BaseComponent {
        componentWillAppear(callback) {
            console.warn('will appear');
            //transition is false here, so use default animation
            this._animate_appear(callback);
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition;
            console.warn('will enter', transition, this.props);
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['_animate_enter_' + transition.type].bind(this);
            if (fn) {
                fn(callback, transition);
            } else {
                return callback();
            }
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition;
            console.warn('will leave', transition);
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['_animate_leave_' + transition.type].bind(this);
            if (fn) {
                fn(callback, transition);
            } else {
                return callback();
            }
        }
        render() {
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }

        ///////////////// Extract dom elements
        // generic, i.e. not homepage
        extractDOMElements() {
            let elements = {
                container: dom.findDOMNode(this.refs.container),
            }, $container = $(elements.container);
            console.warn('extractDOMElements', $container);
            if ($container.is('article.page-home')) {
                return this.extractHomepageDOMElements($container);
            }
            Object.assign(elements, {
                isHomepage: false,
                window: $(window)[0],
                header: $container.find('> header')[0],
                background: $container.find('header .image-container img')[0],
                text1: $container.find('header .text-1 h1')[0],
                text2: $container.find('header .text-2 h2')[0],
                textBottom: $container.find('header .scroll-hint p')[0],
                gradient: $container.find('header .gradient')[0],
            });
            return elements;
        }
        extractHomepageDOMElements($container) {
            console.warn('extractHomepageDOMElements', $container);
            return {
                isHomepage: true,
                container: $container[0],
                background: $container.find('.slide-1.background img')[0],
                text1: $container.find('.slide-1.content .text-1 h1')[0],
                text2: $container.find('.slide-1.content .text-2 h2')[0],
                textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
                gradient: $container.find('> .gradient')[0],
            };
        }

        ///////////////// Animations

        _animate_appear(callback) {
            let elements = this.extractDOMElements();
            if (elements.isHomepage) {
                return this._animate_appear_homepage(callback);
            }
            elements.background && TweenMax.set(elements.background, { scale: 1.2 });
            TweenMax.set(elements.container, { opacity: 0 });
            //TweenMax.set(elements.header, { height: '60%' });
            let tl = new TimelineLite({ onComplete: callback })
                .add(_.filter([
                    elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),
                    TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
                ]));
        }

        //generic, i.e. not homepage
        _animate_enter_header(callback, transition) {
            if (!transition.column || !transition.target) {
                return callback();
            }
            let elements = this.extractDOMElements();
            if (elements.isHomepage) {
                return this._animate_enter_header_homepage(callback, elements, transition);
            }
            console.warn('animate enter header', elements, transition);

            //Setup            
            let $target = $(transition.target).addClass('hover');
            let grid = document.getElementById('page-grid'), $grid = $(grid);
            let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
            let line = $('#page-grid .navigation-line')[0];
            let width = $window.width();
            let position = left * 100 / width;
            var arr1 = [0, 100 - position, 0, position];
            var arr2 = [0, 0, 0, 0];
            arr2.onUpdate = () => {
                TweenMax.set(elements.header, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            };
            arr2.ease = Power3.easeIn;
            let tweenScroll = $(elements.window).scrollTop() > 0;
            !tweenScroll && $('body').css('overflow', 'hidden');

            //Initial state
            TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
            TweenMax.set(elements.container, { zIndex: 2 });
            TweenMax.set(elements.header, { opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            TweenMax.set(line, { left: left, opacity: 1, height: 0 });
            elements.text1 && TweenMax.set(elements.text1, { x: '-100%' });
            elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
            elements.textBottom && TweenMax.set(elements.textBottom, { y: '100%' });
            elements.background && TweenMax.set(elements.background, { scale: 1.2 });
            elements.header && TweenMax.set(elements.header, { height: '100%' });

            //Animation
            let tl1 = new TimelineLite({
                onComplete: (() => {
                    callback();
                    $('body').css('overflow', 'visible');
                }).bind(this),
            })
                .add(_.filter([
                    tweenScroll && TweenMax.to(elements.window, 1, { scrollTo: { y: 0 }, ease: Power3.easeIn,
                        onComplete: () => { $('body').css('overflow', 'hidden'); } }),
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
                    elements.header && TweenMax.to(elements.header, 1, { height: '60%', ease: Power3.easeOut }),
                ]));
        }

        _animate_leave_header(callback, transition) {
            let elements = this.extractDOMElements();
            if (elements.isHomepage) {
                return this._animate_leave_header_homepage(callback, elements, transition);
            }

            //Setup

            //Initial state
            TweenMax.set(elements.container, { zIndex: 1 });
            //TweenMax.set(elements.header, { height: '60%' });

            //Animation
            let tl1 = new TimelineLite({ onComplete: callback })
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, 1, { x: '-100%' }),
                    elements.text2 && TweenMax.to(elements.text2, 1, { x: '-100%' }),
                    elements.textBottom && TweenMax.to(elements.textBottom, 1, { y: '100%' }),
                    elements.background && TweenMax.to(elements.background, 2, { scale: 1.2, ease: Power3.easeIn }),
                    elements.header && TweenMax.to(elements.header, 1, { height: '100%', ease: Power3.easeIn }),
                ]))
                .set({}, {}, 2); //delay before firing onComplete
        }

        _animate_appear_homepage(callback, elements) {
            callback();
        }

        _animate_enter_header_homepage(callback, elements, transition) {
            if (!transition.column || !transition.target) {
                return callback();
            }
            console.warn('animate enter header HOMEPAGE', elements, transition);

            //Setup            
            let $target = $(transition.target).addClass('hover');
            let grid = document.getElementById('page-grid'), $grid = $(grid);
            let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
            let line = $('#page-grid .navigation-line')[0];
            let width = $window.width();
            let position = left * 100 / width;
            var arr1 = [0, 100 - position, 0, position];
            var arr2 = [0, 0, 0, 0];
            arr2.onUpdate = () => {
                TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            };
            arr2.ease = Power3.easeIn;
            let tweenScroll = $(elements.window).scrollTop() > 0;
            !tweenScroll && $('body').css('overflow', 'hidden');

            //Initial state
            TweenPlugin.activate(['scrollTo']);
            TweenMax.set(elements.container, { zIndex: 2, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            TweenMax.set(line, { left: left, opacity: 1, height: 0 });
            elements.text1 && TweenMax.set(elements.text1, { x: '100%' });
            elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
            elements.textBottom && TweenMax.set(elements.textBottom, { y: '200%' });

            //Animation
            let tl1 = new TimelineLite({
                onComplete: (() => {
                    callback();
                    $('body').css('overflow', 'visible');
                }).bind(this),
            })
                .add(_.filter([
                    tweenScroll && TweenMax.to(elements.window, 1, { scrollTo: { y: 0 }, ease: Power3.easeIn,
                        onComplete: () => { $('body').css('overflow', 'hidden'); } }),
                    TweenMax.to(line, 1, {
                        height: '100%', ease: Power3.easeIn, onComplete: () => {
                            TweenMax.set(line, { opacity: 0 });
                            $target.removeClass('hover');
                        },
                    }),
                ]))
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, 1.5, { x: '0%', ease: Power3.easeOut, delay: .5 }),
                    elements.text2 && TweenMax.to(elements.text2, 1.5, { x: '0%', ease: Power3.easeOut, delay: .5 }),
                    elements.textBottom && TweenMax.to(elements.textBottom, 1.5, { y: '0%', ease: Power3.easeOut, delay: .5 }),
                    TweenMax.to(arr1, 1, arr2),
                ]));
        }

        _animate_leave_header_homepage(callback, elements, transition) {
            //Setup

            //Initial state
            TweenMax.set(elements.container, { zIndex: 1 });

            //Animation
            let tl1 = new TimelineLite({ onComplete: callback })
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, 1.5, { x: '100%' }),
                    elements.text2 && TweenMax.to(elements.text2, 1.5, { x: '-100%' }),
                    elements.textBottom && TweenMax.to(elements.textBottom, 1.5, { y: '200%' }),
                    elements.background && TweenMax.to(elements.background, 2, { scale: 1.2, ease: Power3.easeIn }),
                ]))
                .set({}, {}, 2); //delay before firing onComplete
        }
    }

    return TransitionComponent;
};