import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import routePaths from '../../common/routePaths';
import actions, { enableScenes, disableScenes } from '../actions';
import * as animations_generic from './animations/generic';
import * as animations_homepage from './animations/homepage';
import dom from 'react-dom';


let $ = window.$, $body = $('body'), $window = $(window);

let animations = {
    generic: animations_generic,
    homepage: animations_homepage,
};

const stateToProps = state => ({
    transition: state.transition,
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
    return {
		enableScenes: () => {
			dispatch(enableScenes());
		},
        disableScenes: () => {
			dispatch(disableScenes());
		},
        dispatchTransition: (setup) => {
            dispatch(actions.transition(setup));
        },
    };
};

export default (BaseComponent) => {
    BaseComponent.propTypes = {
        enableScenes: PropTypes.func.isRequired,
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps, mapDispatchToProps)(BaseComponent);

    class TransitionComponent extends BaseComponent {
        //spread op works only because of plugins in babelrc (on IE10)
        constructor(...args) {
            super(...args);
            this.enableScenes = this.enableScenes.bind(this);
            this.disableScenes = this.disableScenes.bind(this);
            this.cleanTransition = this.cleanTransition.bind(this);
        }
        componentWillAppear(callback) {
            $body.addClass('navigating');
            let animationName = 'generic';
            this.props.route.path == routePaths.client.root && (animationName = 'homepage');
            this.animation = animations[animationName];
            this.animationName = animationName; //only for console.log in the Leave function below

            console.log('componentWillAppear', animationName, 'appear');

            this.animation.appear(this.refs.container, this.willEnterCallback.bind(this, callback));
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition, ui = this._clone.props.ui;

            let animationName = 'generic';
            this.props.route.path == routePaths.client.root && (animationName = 'homepage');
            this.animation = animations[animationName];
            this.animationName = animationName; //only for console.log in the Leave function below

            if (!transition || !transition.type) {
                //console.warn('componentWillEnter HAS NO TYPE');
				// make sure callback always is called after willLeaveCallback
                return setTimeout((() => {
                    this.willEnterCallback(callback);
                }).bind(this), 200);
            }
            console.log('componentWillEnter', animationName, ui.media.current + '_enter_' + transition.type);

            if (this.animation[ui.media.current + '_enter_' + transition.type]) {
                this.animation[ui.media.current + '_enter_' + transition.type](this.refs.container, this.willEnterCallback.bind(this, callback), transition);
            }
            else {
                console.warn('On enter,', animationName, 'does not have any animation:', ui.media.current + '_enter_' + transition.type);
                return this.willEnterCallback(callback);
            }
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition, ui = this._clone.props.ui;
            if (!transition || !transition.type || !this.animation) {
                // console.log('componentWillLeave HAS NO TYPE OR ANIMATION', transition, this.animation);
				
				// on clicking Back, leaving page makes sure no scroll on page, so new page will not get automaitc browser scroll
                this.disableScenes();
                $.scrollLock(true);

                return this.willLeaveCallback(callback);
            }
            console.log('componentWillLeave', this.animationName, ui.media.current + '_leave_' + transition.type);

            if (this.animation[ui.media.current + '_leave_' + transition.type]) {
                let initialScroll = $window.scrollTop();
                this.disableScenes();
                $.scrollLock(true);
                this.animation[ui.media.current + '_leave_' + transition.type](this.refs.container, this.willLeaveCallback.bind(this, callback), transition, initialScroll);
            }
            else {
                console.warn('On leave, does not have any animation: ', ui.media.current + '_leave_' + transition.type);
                return this.willLeaveCallback(callback);
            }

        }
        willEnterCallback(callback) {
            console.log('willEnterCallback ',this.animationName);
            $body.removeClass('navigating');
            $(dom.findDOMNode(this.refs.container)).removeClass('fix-header contact-open menu-open');
            this.cleanTransition();
            $.scrollLock(false, false);
            setTimeout((() => {
                this.enableScenes();
            }).bind(this), 100);
            callback();
        }
        willLeaveCallback(callback) {
            console.log('willLeaveCallback', this.animationName);
            callback();
        }
        render() {
            if (!this.firstRenderDone) {
                //this happens earlier than handleMediaChange in components, which can use it to fix things
                //e.g. home won't scrollTop 0 earlier than us recording scroll position in componentWillLeave
                $body.addClass('navigating');
                this.firstRenderDone = true; //subsequent store updates shouldn't set the class, obviously
            }
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }

        enableScenes() {
            this._clone.props.enableScenes();
        }
        disableScenes() {
            this._clone.props.disableScenes();
        }
        cleanTransition() {
            this._clone.props.dispatchTransition({type: ''});
        }
    }

    return TransitionComponent;
};
