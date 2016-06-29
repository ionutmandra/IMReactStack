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
            article = this.article = $header.closest('article.page');
        //headerBottom = $header.position().top + $header.height();
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];

        if (this.props.isHomepage) {
            this.handleMediaChange(this.props.ui.media);
            return;
        }

        //change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function (newpos) {
            var t = TweenMax.to(window, .7, { scrollTo: { y: newpos }, ease: Power3.easeOut });
            timeLines.push(t);
            return t;
        });

        let scene = new ScrollMagic.Scene({ triggerElement: article, triggerHook: 'onLeave', offset: 400 }).addTo(controller)
            //.addIndicators({name:'large Scene 2'})
            .on('start', event => {
                if (event.scrollDirection == 'FORWARD') {
                    article.addClass('fix-header');
                    console.log('header sc2 end forw');
                }
                if (event.scrollDirection == 'REVERSE') {
                    article.removeClass('fix-header');
                    console.log('header sc1 pr rev');
                }
            });

        ////
        // LARGE SCREEN
        ///////////////////


        scenes[breakpoint.names.large].push(scene);
        scenes[breakpoint.names.medium].push(scene);
        scenes[breakpoint.names.small].push(scene);

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
        if (this.props.transition.scrollScenesEnabled == true) {
            this.setScenes(media.current, true);
        }

        console.warn('header handleMediaChange', media, this.props.isHomepage, $window.scrollTop());
        if (this.props.isHomepage) {
            this.article.addClass('fix-header');
        } else if ($window.scrollTop() < 400) {
            this.article.removeClass('fix-header');
        } else {
            this.article.addClass('fix-header');
        }
    }

    setScenes(media, enabled, args = []) {
        //console.warn('header setting scenes for', media, 'to', enabled, 'on', $(this.refs.header).closest('article').attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); scene.trigger(enabled ? 'enabled' : 'disabled', args); });
    }

    render() {
        if (this.props.isHomepage) {
            return (
                <header className="main" ref="header">
                    <Logo isHomepage />
                    <HeaderLinks isHomepage />
                    <Burger isHomepage />
                    <Contact isHomepage renderCloseButton />
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
    isHomepage: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;