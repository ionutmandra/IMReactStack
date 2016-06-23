import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import routePaths from '../../common/routePaths';
import * as animations_generic from './animations/generic';
import * as animations_homepage from './animations/homepage';
let $body = window.$('body');

let animations = {
    generic: animations_generic,
    homepage: animations_homepage,
};

const stateToProps = state => ({
    transition: state.transition,
});

export default (BaseComponent) => {
    BaseComponent.propTypes = {
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps)(BaseComponent);

    class TransitionComponent extends BaseComponent {
        componentWillAppear(callback) {
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];

            //console.log('componentWillAppear', this);

            this.clean = this.animation.appear(this.refs.container, this.callback.bind(this, callback));
        }
        componentDidAppear() {
            this.performCleanup();
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition;
            if (!transition || !transition.type) {
                return callback();
            }
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];

            //console.log('componentWillEnter', this);

            if (this.animation['enter_' + transition.type]) {
                this.clean = this.animation['enter_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition);
            }
            else {
                console.warn('On enter, ' + animation + 'does not have any animation: ' + transition.type);
            }
        }
        componentDidEnter() {
            this.performCleanup();
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition;
            if (!transition || !transition.type || !this.animation) {
                return callback();
            }
            $body.addClass('navigating');

            console.log('componentWillLeave using transition description ', transition);

            if (this.animation['leave_' + transition.type]) {
                this.clean = this.animation['leave_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition);
            }
            else {
                console.warn('On leave, does not have any animation: ' + transition.type);
            }

        }
        componentDidLeave() {
            this.performCleanup();
        }
        callback(callback) {
            $body.removeClass('navigating');
            callback();
        }
        render() {
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }
        performCleanup() {
            if (this.clean) {
                if (this.clean.scenes) {
                    for (let i = 0; i < this.clean.scenes.length; i++) {
                        if (this.clean.scenes[i]) {
                            this.clean.scenes[i].destroy();
                            this.clean.scenes[i] = null;
                        }
                    }
                }
                if (this.clean.timeLines) {
                    for (let i = 0; i < this.clean.timeLines.length; i++) {
                        this.clean.timeLines[i] = null;
                    }
                }
                if (this.clean.controller) {
                    this.clean.controller.destroy();
                    this.clean.controller = null;
                }
                this.clean = null;
            }
        }
    }

    return TransitionComponent;
};