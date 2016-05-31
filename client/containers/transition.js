import React, { PropTypes } from 'react';
import dom from 'react-dom';
import { connect } from 'react-redux';

const stateToProps = state => ({
    transition: state.transition,
});

export default (BaseComponent) => {
    BaseComponent.propTypes = {
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps, null, null, { withRef: true })(BaseComponent);

    class TransitionComponent extends BaseComponent {
        componentWillAppear(callback) {
            console.warn('instant appear', dom.findDOMNode(this.refs['dom']), this._props.transition);
            //setTimeout(callback, 5000);
            callback();
        }
        componentWillEnter(callback) {
            console.warn('will enter', dom.findDOMNode(this.refs['dom']), this._props.transition);
            let transition = this._props.transition;
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['animate_enter_' + transition.type];
            if (fn) {
                fn(callback, dom.findDOMNode(this.refs['dom']), transition);
            } else {
                return callback();
            }
        }
        componentWillLeave(callback) {
            console.warn('will leave', dom.findDOMNode(this.refs['dom']), this._props.transition);
            let transition = this._props.transition;
            if (!transition || !transition.type) {
                return callback();
            }
            //Call animation function on `this`, depending on transition type
            let fn = this['animate_leave_' + transition.type];
            if (fn) {
                fn(callback, dom.findDOMNode(this.refs['dom']), transition);
            } else {
                return callback();
            }
        }
        render() {
            let clone = React.cloneElement(super.render(), { ref: 'dom' });
            this._props = clone.props;
            return clone;
        }

        ///////////////// Animations

        animate_enter_header(callback, element, transition) {
            if (!transition.column) {
                return callback();
            }
            let line = document.getElementById('transition-line-' + transition.column);
            let tl = new TimelineLite({ onComplete: callback })
                .set(element, { opacity: 0, zIndex: 2 })
                .to(line, .2, { height: '30%', ease: Power2.easeIn })
                .to(line, .1, { height: '80%', ease: Power2.easeOut })
                .to(line, .2, { height: '100%', ease: Power2.easeIn })
                .set(line, { height: 0 })
                .set(element, { opacity: 1, zIndex: 2, backgroundColor: 'red' });
                
            //var arr1 = [0, 100 - $line.position().left / $window.width() * 100, 0, $line.position().left / $window.width() * 100];
            var arr1 = [0, 50, 0, 50];
            var arr2 = [0, 0, 0, 0];
            arr2.onUpdate = () => {
                TweenMax.set(element, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
            };
            arr2.ease = Power3.easeIn;

            tl.set(element, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' })
                .to(arr1, 1, arr2);
        }

        animate_leave_header(callback, element, transition) {
            TweenMax.set(element, { zIndex: 0 });
            setTimeout(callback, 1500);
        }
    }

    return TransitionComponent;
};