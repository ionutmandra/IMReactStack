import React, { PropTypes } from 'react';
import dom from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import routePaths from '../../common/routePaths';
//import config from '../config/transition';

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
            console.warn('will appear', this.props.route.path == routePaths.client.root);
            //transition is false here, so use default animation
            this._homepage = this.props.route.path == routePaths.client.root ? '_homepage' : '';
            let fn = this['_animate_appear' + this._homepage].bind(this);
            if (fn) {
                fn(callback);
            } else {
                return callback();
            }
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition;
            console.warn('will enter', transition, this.props);
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type and page
            this._homepage = this.props.route.path == routePaths.client.root ? '_homepage' : '';
            let fn = this['_animate_enter_' + transition.type + this._homepage].bind(this);
            //console.warn('ENTER', '_animate_enter_' + transition.type + this._homepage, fn);
            if (fn) {
                fn(callback, transition);
            } else {
                return callback();
            }
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition;
            console.warn('will leave', transition, !!this._homepage);
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type and page
            let fn = this['_animate_leave_' + transition.type + this._homepage].bind(this);
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
            Object.assign(elements, {
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
        extractHomepageDOMElements() {
            let elements = {
                container: dom.findDOMNode(this.refs.container),
            }, $container = $(elements.container);
            console.warn('extractHomepageDOMElements', $container);
            return {
                container: $container[0],
                background: $container.find('.slide-1.background img')[0],
                text1: $container.find('.slide-1.content .text-1 h1')[0],
                text2: $container.find('.slide-1.content .text-2 h2')[0],
                textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
                gradient: $container.find('> .gradient')[0],
            };
        }

        ///////////////// Animations /////////////////////////

        // APPEAR - first time load
        /////////////////

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

        _animate_appear_homepage(callback) {
            let elements = this.extractHomepageDOMElements();
            elements.background && TweenMax.set(elements.background, { scale: 1.2 });
            TweenMax.set(elements.container, { opacity: 0 });
            //TweenMax.set(elements.header, { height: '60%' });
            let tl = new TimelineLite({ onComplete: callback })
                .add(_.filter([
                    elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),
                    TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
                ]));
        }

        // ENTER - navigation after first time load
        /////////////////

        _enter_header_setup(callback, extract, transition) {
            if (!transition.column || !transition.target) {
                return callback();
            }
            let elements = extract();
            console.warn('animate enter header SETUP', elements, transition);

            let $target = $(transition.target).addClass('hover');
            let grid = document.getElementById('page-grid'), $grid = $(grid);
            let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
            let line = $('#page-grid .navigation-line')[0];
            let width = $window.width();
            let position = left * 100 / width;
            var arr1 = [0, 100 - position, 0, position];
            var arr2 = [0, 0, 0, 0];
            arr2.ease = Power3.easeIn;
            $(elements.window).scrollTop(0);
            $('body').css('overflow', 'hidden');

            return Object.assign({}, elements, { $target, line, left, arr1, arr2 });
        }

        _animate_enter_header(callback, transition) {
            //Setup
            let setup = this._enter_header_setup(callback, this.extractDOMElements.bind(this), transition);
            setup.arr2.onUpdate = () => {
                TweenMax.set(setup.header, { webkitClipPath: 'inset(' + setup.arr1[0] + '% ' + setup.arr1[1] + '% ' + setup.arr1[2] + '% ' + setup.arr1[3] + '%)' });
            };
            
            //Initial state
            TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
            TweenMax.set(setup.container, { zIndex: 2 });
            TweenMax.set(setup.header, { opacity: 1, webkitClipPath: 'inset(' + setup.arr1[0] + '% ' + setup.arr1[1] + '% ' + setup.arr1[2] + '% ' + setup.arr1[3] + '%)' });
            TweenMax.set(setup.line, { left: setup.left, opacity: 1, height: 0 });
            setup.text1 && TweenMax.set(setup.text1, { x: '-100%' });
            setup.text2 && TweenMax.set(setup.text2, { x: '-100%' });
            setup.textBottom && TweenMax.set(setup.textBottom, { y: '100%' });
            setup.background && TweenMax.set(setup.background, { scale: 1.2 });
            setup.header && TweenMax.set(setup.header, { height: '100%' });

            //Animation
            let tl1 = new TimelineLite({
                onComplete: (() => {
                    callback();
                    $('body').css('overflow', 'visible');
                }).bind(this),
            })
                .add(_.filter([
                    TweenMax.to(setup.line, 1, {
                        height: '100%', ease: Power3.easeIn, onComplete: () => {
                            TweenMax.set(setup.line, { opacity: 0 });
                            setup.$target.removeClass('hover');
                        },
                    }),
                ]))
                .add(_.filter([
                    TweenMax.to(setup.arr1, 1, setup.arr2),
                ]))
                .add(_.filter([
                    setup.text1 && TweenMax.to(setup.text1, 1, { x: '0%', ease: Power3.easeOut }),
                    setup.text2 && TweenMax.to(setup.text2, 1, { x: '0%', ease: Power3.easeOut }),
                    setup.textBottom && TweenMax.to(setup.textBottom, 1, { y: '0%', ease: Power3.easeOut }),
                    setup.background && TweenMax.to(setup.background, 1, { scale: 1, ease: Power3.easeOut }),
                    setup.header && TweenMax.to(setup.header, 1, { height: '60%', ease: Power3.easeOut }),
                ]));
        }

        _animate_enter_header_homepage(callback, transition) {
            //Setup
            let setup = this._enter_header_setup(callback, this.extractHomepageDOMElements.bind(this), transition);
            setup.arr2.onUpdate = () => {
                TweenMax.set(setup.container, { webkitClipPath: 'inset(' + setup.arr1[0] + '% ' + setup.arr1[1] + '% ' + setup.arr1[2] + '% ' + setup.arr1[3] + '%)' });
            };

            //Initial state
            TweenPlugin.activate(['scrollTo']);
            TweenMax.set(setup.container, { zIndex: 2, webkitClipPath: 'inset(' + setup.arr1[0] + '% ' + setup.arr1[1] + '% ' + setup.arr1[2] + '% ' + setup.arr1[3] + '%)' });
            TweenMax.set(setup.line, { left: setup.left, opacity: 1, height: 0 });
            setup.text1 && TweenMax.set(setup.text1, { x: '100%' });
            setup.text2 && TweenMax.set(setup.text2, { x: '-100%' });
            setup.textBottom && TweenMax.set(setup.textBottom, { y: '200%' });

            //Animation
            let tl1 = new TimelineLite({
                onComplete: (() => {
                    callback();
                    $('body').css('overflow', 'visible');
                }).bind(this),
            })
                .add(_.filter([
                    TweenMax.to(setup.line, 1, {
                        height: '100%', ease: Power3.easeIn, onComplete: () => {
                            TweenMax.set(setup.line, { opacity: 0 });
                            setup.$target.removeClass('hover');
                        },
                    }),
                ]))
                .add(_.filter([
                    setup.text1 && TweenMax.to(setup.text1, 1.5, { x: '0%', ease: Power3.easeOut, delay: .5 }),
                    setup.text2 && TweenMax.to(setup.text2, 1.5, { x: '0%', ease: Power3.easeOut, delay: .5 }),
                    setup.textBottom && TweenMax.to(setup.textBottom, 1.5, { y: '0%', ease: Power3.easeOut, delay: .5 }),
                    TweenMax.to(setup.arr1, 1, setup.arr2),
                ]));
        }

        // LEAVE - navigate away from this page
        /////////////////

        _animate_leave_header(callback, transition) {
            let elements = this.extractDOMElements();

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
                    elements.header && TweenMax.to(elements.header, 1, { height: '100%', ease: Power3.easeIn }),
                ]))
                .set({}, {}, 2); //delay before firing onComplete
        }

        _animate_leave_header_homepage(callback, transition) {
            let elements = this.extractHomepageDOMElements();
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