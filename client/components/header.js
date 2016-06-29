import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Contact from '../containers/contactContainer';
import Burger from '../containers/burgerContainer';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    componentDidMount() {
        let controller = this.controller = new ScrollMagic.Controller(),
            timeLines = this.timeLines = [],
            scenes = this.scenes = {},
            $header = $(this.refs.header),
            $container = $header.parent();
        //headerBottom = $header.position().top + $header.height();
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];
        if (this.props.stationary) return;

        //change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function (newpos) {
            var t = TweenMax.to(window, .7, { scrollTo: { y: newpos }, ease: Power3.easeOut });
            timeLines.push(t);
            return t;
        });

        ////
        // LARGE SCREEN
        ///////////////////

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
            //.addIndicators({name:'large Scene 1'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    console.log('large header sc1 end forw');
                    //controller.scrollTo(headerBottom);
                    $container.addClass('links-hidden');
                }
                if (event.scrollDirection == 'REVERSE') {
                    console.log('large header sc1 end rev');
                    $container.removeClass('links-hidden');
                }
            })
        );

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 40, offset: 360 }).addTo(controller)
            //.addIndicators({name:'large Scene 2'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    $container.addClass('fix-header');
                    console.log('large header sc2 end forw');
                }
                if (event.scrollDirection == 'REVERSE') {
                    $container.removeClass('fix-header');
                    //controller.scrollTo(0);
                    console.log('large header sc1 pr rev');
                }
            })
        );

        ////
        // MEDIUM SCREEN
        ///////////////////

        // scenes[breakpoint.names.medium].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
        //     //.addIndicators({name:'medium Scene 1'})
        //     .on('enabled', () => { $container.addClass('fix-header'); })
        //     .on('disabled', event => { event[0] == breakpoint.names.large && $container.removeClass('links-hidden fix-header'); })
        // );

        scenes[breakpoint.names.medium].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
            //.addIndicators({name:'medium Scene 1'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    console.log('medium header sc1 end forw');
                    //controller.scrollTo(headerBottom);
                    $container.addClass('links-hidden');
                }
                if (event.scrollDirection == 'REVERSE') {
                    console.log('medium header sc1 end rev');
                    $container.removeClass('links-hidden');
                }
            })
        );

        scenes[breakpoint.names.medium].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 40, offset: 360 }).addTo(controller)
            //.addIndicators({name:'medium Scene 2'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    $container.addClass('fix-header');
                    console.log('medium header sc2 end forw');
                }
                if (event.scrollDirection == 'REVERSE') {
                    $container.removeClass('fix-header');
                    //controller.scrollTo(0);
                    console.log('medium header sc1 pr rev');
                }
            })
        );

        ////
        // SMALL SCREEN
        ///////////////////

        // scenes[breakpoint.names.small].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
        //     //.addIndicators({name:'small Scene 1'})
        //     .on('enabled', () => { $container.addClass('fix-header'); })
        //     .on('disabled', event => { event[0] == breakpoint.names.large && $container.removeClass('links-hidden fix-header'); })
        // );

        scenes[breakpoint.names.small].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
            //.addIndicators({name:'large Scene 1'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    console.log('small header sc1 end forw');
                    //controller.scrollTo(headerBottom);
                    $container.addClass('links-hidden');
                }
                if (event.scrollDirection == 'REVERSE') {
                    console.log('small header sc1 end rev');
                    $container.removeClass('links-hidden');
                }
            })
        );

        scenes[breakpoint.names.small].push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 40, offset: 360 }).addTo(controller)
            //.addIndicators({name:'small Scene 2'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    $container.addClass('fix-header');
                    console.log('small header sc2 end forw');
                }
                if (event.scrollDirection == 'REVERSE') {
                    $container.removeClass('fix-header');
                    //controller.scrollTo(0);
                    console.log('small header sc1 pr rev');
                }
            })
        );

        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.transition.scrollScenesEnabled != nextProps.transition.scrollScenesEnabled) {
            this.setScenes(this.props.ui.media.current, nextProps.transition.scrollScenesEnabled);
        }
        if (this.props.ui.media.current != nextProps.ui.media.current) {
            this.handleMediaChange(nextProps.ui.media);
        }
        return false;
    }

    componentWillUnmount() {
        for (let media in breakpoint.names) {
            if (this.scenes[media] && this.scenes[media].length && this.scenes[media][0].destroy) {
                for (let i = 0; i < this.scenes[media].length; i++) {
                    this.scenes[media][i].destroy();
                    this.scenes[media][i] = null;
                }
            }
        }
        for (let i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }
        this.controller.destroy();
        this.controller = null;
    }

    handleMediaChange(media) {
        for (let name in breakpoint.names) {
            this.setScenes(name, false, [media.current]);
        }
        this.setScenes(media.current, true);
    }

    setScenes(media, enabled, args = []) {
        //console.warn('header setting scenes for', media, 'to', enabled, 'on', $(this.refs.header).closest('article').attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); scene.trigger(enabled ? 'enabled' : 'disabled', args); });
    }

    render() {
        if (this.props.stationary) {
            return (
                <header className="main" ref="header">
                    <Logo stationary />
                    <HeaderLinks stationary />
                    <Burger stationary />
                    <Contact stationary renderCloseButton />
                </header>
            );
        } else {
            return (
                <header className="main" ref="header">
                    <div className="image"><div className="img" /></div>
                    <div className="gradient" />
                    <Logo />
                    <HeaderLinks />
                    <div className="text"><h1>{this.props.title}</h1></div>
                    <Burger />
                    <Contact renderCloseButton />
                </header>
            );
        }
    }
}

Header.propTypes = {
    //cancelScene: PropTypes.string,
    stationary: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;