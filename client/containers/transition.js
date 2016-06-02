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
            console.warn('will enter', elements, transition);
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
                background: $container.find('[data-ref=background]')[0],
                text1: $container.find('[data-ref=text1]')[0],
                text2: $container.find('[data-ref=text2]')[0],
                textBottom: $container.find('[data-ref=textBottom]')[0],
                gradient: $container.find('[data-ref=gradient]')[0],
            });
            return elements;
        }

        ///////////////// Animations

        _animate_appear(callback, elements) {
            elements.background && TweenMax.set(elements.background, { scale: 1.2 });
            TweenMax.set(elements.container, { opacity: 0 });
            let tl = new TimelineLite({ onComplete: callback })
                .add(_.filter([
                    elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),                                        
                    TweenMax.to(elements.container, 1, { opacity: 1, ease: Power3.easeOut }),
                ]));
        }

        _animate_enter_header(callback, elements, transition) {
            if (!transition.column || !transition.target) {
                return callback();
            }
            console.warn('animate enter header', elements);

            //Setup
            let $target = $(transition.target).addClass('hover');
            elements.text1 && (elements.text1.direction = $(elements.text1).hasClass('grid-block-contentl') ? 'left' : 'right');
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
            
            //Initial state
            TweenMax.set(elements.container, { opacity: 1, zIndex: 2, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            TweenMax.set(line, { opacity: 1, height: 0 });
            elements.text1 && TweenMax.set(elements.text1, { x: elements.text1.direction == 'left' ? '100%' : '-100%' });
            elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
            elements.textBottom && TweenMax.set(elements.textBottom, { y: '100%' });
            elements.background && TweenMax.set(elements.background, { scale: 1.2, height: '100%' });
            elements.gradient && TweenMax.set(elements.gradient, { height: '100%' });

            //Animation
            let tl1 = new TimelineLite({ onComplete: callback })
                .to(line, 1, { height: '100%', ease: Power3.easeIn, onComplete: () => {
                    TweenMax.set(line, { opacity: 0 });
                    $target.removeClass('hover');
                } })
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, 1, { x: '0%', ease: Power3.easeOut }),
                    elements.text2 && TweenMax.to(elements.text2, 1, { x: '0%', ease: Power3.easeOut }),                                        
                    elements.textBottom && TweenMax.to(elements.textBottom, 1, { y: '0%', ease: Power3.easeOut }),                                        
                    elements.background && TweenMax.to(elements.background, 1, { scale: 1, ease: Power3.easeOut }),                                        
                    TweenMax.to(arr1, 1, arr2),
                ]))
                .add(_.filter([
                    elements.background && TweenMax.to(elements.background, 1, { height: '60%', ease: Power3.easeInOut }),
                    elements.gradient && TweenMax.to(elements.gradient, 1, { height: '60%', ease: Power3.easeInOut }),
                ]));                
        }

        _animate_leave_header(callback, elements, transition) {
            //Setup
            elements.text1 && (elements.text1.direction = $(elements.text1).hasClass('grid-block-contentl') ? 'left' : 'right');
            
            //Initial state
            TweenMax.set(elements.container, { zIndex: 1 });
            
            //Animation
            let tl1 = new TimelineLite({ 
                onComplete: callback 
            })
                .add(_.filter([
                    elements.text1 && TweenMax.to(elements.text1, 1, { x: elements.text1.direction == 'left' ? '100%' : '-100%' }),
                    elements.text2 && TweenMax.to(elements.text2, 1, { x: '-100%' }),
                    elements.textBottom && TweenMax.to(elements.textBottom, 1, { y: '100%' }),
                    elements.background && TweenMax.to(elements.background, 1, { scale: 1.2, ease: Power3.easeIn }),                                        
                    elements.gradient && TweenMax.to(elements.gradient, 1, { height: '100%', ease: Power3.easeIn }),                                        
                ]))
                .set({}, {}, 2); //delay before firing onComplete
            //setTimeout(callback, 20000);
        }
    }

    return TransitionComponent;
};