import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import routePaths from '../../common/routePaths';
import { enableScenes } from '../actions';
import * as animations_generic from './animations/generic';
import * as animations_homepage from './animations/homepage';
let $body = window.$('body');

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
    };
};

export default (BaseComponent) => {
    BaseComponent.propTypes = {
        enableScenes: PropTypes.func.isRequired,
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps, mapDispatchToProps)(BaseComponent);

    class TransitionComponent extends BaseComponent {
        constructor(...args) {
            super(...args);
            this.enableScenes = this.enableScenes.bind(this);
        }
        componentWillAppear(callback) {
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];

            //console.log('componentWillAppear', this);

            this.animation.appear(this.refs.container, this.callback.bind(this, callback));
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition, ui = this._clone.props.ui;
            if (!transition || !transition.type) {
                return callback();
            }
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];

            //console.log('componentWillEnter', this);

            if (this.animation[ui.media.current + '_enter_' + transition.type]) {
                this.animation[ui.media.current + '_enter_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition, this.enableScenes);
            }
            else {
                console.warn('On enter,', animation, 'does not have any animation:', ui.media.current + '_enter_' + transition.type);
            }
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition, ui = this._clone.props.ui;
            if (!transition || !transition.type || !this.animation) {
                return callback();
            }
            $body.addClass('navigating');

            console.log('componentWillLeave using transition description ' , transition);

            if (this.animation[ui.media.current + '_leave_' + transition.type]) {
                this.animation[ui.media.current + '_leave_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition);
            }
            else {
                console.warn('On leave, does not have any animation: ', ui.media.current + '_leave_' + transition.type);
            }

        }
        callback(callback) {
            $body.removeClass('navigating');
            callback();
        }
        render() {
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }

        enableScenes() {
            this._clone.props.enableScenes();
        }
    }

    return TransitionComponent;
};