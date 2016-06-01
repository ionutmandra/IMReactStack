import React, { PropTypes } from 'react';
import dom from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

const stateToProps = state => ({
    transition: state.transition,
});

export default (BaseComponent, getRefs) => {
    let $window = $(window);

    BaseComponent.propTypes = {
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps)(BaseComponent);

    class TransitionComponent extends BaseComponent {
        componentWillAppear(callback) {
            let elements = this.extractDOMElements();
            console.warn('will appear', elements);
            //transition is false here, so use default animation
            this._animate_appear(callback, elements);
        }
        componentWillEnter(callback) {
            let elements = this.extractDOMElements();
            let transition = this._clone.props.transition;
            console.warn('will enter', elements, transition, getRefs, getRefs && getRefs());
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['_animate_enter_' + transition.type];
            if (fn) {
                fn(callback, elements, transition);
            } else {
                return callback();
            }
        }
        componentWillLeave(callback) {
            let elements = this.extractDOMElements();
            let transition = this._clone.props.transition;
            console.warn('will leave', elements, transition);
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['_animate_leave_' + transition.type];
            if (fn) {
                fn(callback, elements, transition);
            } else {
                return callback();
            }
        }
        render() {
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }

        ///////////////// Extract dom elements from refs
        extractDOMElements() {
            let elements = {
                container: dom.findDOMNode(this.refs.container),
            }, $container = $(elements.container);
            Object.assign(elements, {
                background: $container.find('[data-ref=background]'),
                text1: $container.find('[data-ref=text1]'),
                text2: $container.find('[data-ref=text2]'),
            });
            elements.background && !elements.background.length && (elements.background = false);
            elements.text1 && !elements.text1.length && (elements.text1 = false);
            elements.text2 && !elements.text2.length && (elements.text2 = false);
            return elements;
        }

        ///////////////// Animations

        _animate_appear(callback, element) {
            let tl = new TimelineLite({ onComplete: callback })
                .set(element, { opacity: 0 })
                .to(element, .35, { opacity: 1, ease: Power2.easeIn });
        }

        _animate_enter_header(callback, elements, transition) {
            if (!transition.column || !transition.target) {
                return callback();
            }
            console.warn('animate enter header', elements);

            //Setup
            let $target = $(transition.target).addClass('hover');
            elements.text1 && (elements.text1.direction = elements.text1.hasClass('grid-block-contentl') ? 'right' : 'left');
            let line = document.getElementById('transition-line-' + transition.column), $line = $(line);
            let left = $line.offset().left;
            let width = $window.width();
            let position = left * 100 / width;
            var arr1 = [0, 100 - position, 0, position];
            var arr2 = [0, 0, 0, 0];
            arr2.onUpdate = () => {
                TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            };
            arr2.ease = Power3.easeIn;

            //Animation
            let tl1 = new TimelineLite({ onComplete: callback })
                .set(elements.container, { opacity: 1, zIndex: 2, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' })
                .set(line, { opacity: 1 })
                .add(_.filter([
                    elements.text1 && TweenMax.set(elements.text1[0], { x: '-100%' }),
                    elements.text2 && TweenMax.set(elements.text2, { x: '-100%' }),
                ]))
                .to(line, .2, { height: '30%', ease: Power2.easeIn })
                .to(line, .2, { height: '80%', ease: Power2.easeOut })
                .to(line, .1, { height: '100%', ease: Power2.easeIn })
                .add(() => { $target.removeClass('hover'); })
                .add(_.filter([
                    TweenMax.to(line, .5, { opacity: 0 }),
                    TweenMax.to(arr1, 1, arr2),
                    elements.text1 && TweenMax.to(elements.text1, 1, { x: '0%', ease: Power3.easeInOut }),
                    elements.text2 && TweenMax.to(elements.text2, 1, { x: '0%', ease: Power3.easeInOut }),                                        
                ]))
                .set(line, { height: 0 });
        }

        _animate_leave_header(callback, elements, transition) {
            let tl1 = new TimelineLite({ onComplete: callback })
                .set(elements.container, { zIndex: 1 })
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, .5, { x: '-100%' }),
                ]))
                .set({}, {}, 1.5);
        }
    }

    return TransitionComponent;
};