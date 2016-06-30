import React, { Component } from 'react';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

export default class Burger extends Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        let refs = this.refs,
            scenes = this.scenes = {},
            controller = this.controller = new ScrollMagic.Controller(),
            hamburger = this.hamburger = $(refs.hamburger),
            trigger = this.article = hamburger.closest('article.page');
        
        this.timeLines = [];
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];

        this.header = trigger.find('header.main');
        this.image = this.header.find('> .image .img');
        this.logoImage = this.header.find('> .logo .img');
        this.logoText = this.header.find('> .logo .text svg');
        this.links = this.header.find('nav ul li a');
        this.text = this.header.find('> .text h1');

        this.burger = $(refs.burger);
        this.close = $(refs.close);

        if (this.props.isHomepage) {
            this.handleMediaChange(this.props.ui.media);
            return;
        }

        ////
        // LARGE SCREEN
        ///////////////////

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            .on('start', event => {
                if (event.scrollDirection == 'FORWARD') {
                    hamburger.addClass('active');
                }
                if (event.scrollDirection == 'REVERSE') {
                    hamburger.removeClass('active');
                }
            })
            .setTween(this.showBurgerFromLeft())
        );

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 355 }).addTo(controller)
            .setTween(this.darken())
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
            this.setScenes(name, false);
        }
        if (this.props.transition.scrollScenesEnabled == true) {
            this.setScenes(media.current, true);
        }

        let scrollTop = $window.scrollTop();
        if(media.current == breakpoint.names.large)
        {
            if (this.props.isHomepage || scrollTop == 0) {
                this.hamburger.removeClass('active');
                this.hideBurgerLeftInstant();
                this.hideCloseLeftInstant();
            } else if (scrollTop < 355) {
                this.hamburger.addClass('active');
                this.lightInstant();
                this.hideCloseLeftInstant();
                this.showBurgerInstant();
            } else {
                this.hamburger.addClass('active');
                this.darkInstant();
                this.hideCloseLeftInstant();
                this.showBurgerInstant();
            }
        } else if (media.current != breakpoint.names.none) {
            this.hamburger.addClass('active');
            this.lightInstant();
            this.hideCloseRightInstant();
            this.showBurgerInstant();            
        }
    }

    setScenes(media, enabled, args = []) {
        //console.warn('logo setting scenes for', media, 'to', enabled,'on', this.article.attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); scene.trigger(enabled ? 'enabled' : 'disabled', args); });
    }

    open() {
        if (this.inProgress) return false;
        this.inProgress = true;

        this.initialScroll = $window.scrollTop();
        this.initialHeight = 400 - this.initialScroll;
        this.props.disableScenes();
        $.scrollLock(true);

        let color = '#fefefe';
        this.prevColor = $(this.refs.burger).css('color');

        this.wasFixedBurger = this.article.hasClass('fix-header');
        this.wasFixedBurger && TweenMax.set(this.text, { x: '-100%' });
        this.wasFixedBurger && TweenMax.set(this.image, { scale: 1.1, opacity: 0 });

        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        console.warn('burger isLarge', isLarge);

        let timeline = new TimelineLite({
            onComplete: (() => {
                this.openComplete();
                timeline = null; //cleanup
            }).bind(this),
        })
            .add(_.filter([
                !this.wasFixedBurger && TweenMax.to(this.text, .3, { x: '-100%', ease: Power3.easeOut }),
                !this.wasFixedBurger && TweenMax.to(this.image, .3, { scale: 1.1, opacity: 0, ease: Power3.easeOut }),
            ]))
            .add((() => {
                this.article.addClass('fix-header');
                !this.wasFixedBurger && this.header.height(this.initialHeight);
                $.scrollLock(true);
            }).bind(this))
            .add(_.filter([
                TweenMax.to(this.refs.burger, .3, { x: isLarge ? '-100%' : '105%', ease: Power3.easeOut }),
                TweenMax.to(this.logoImage, .3, { color: color, ease: Power3.easeOut }),
                TweenMax.to(this.header, .5, { height: '100%', ease: Power3.easeOut }),
            ]))
            .add(_.filter([
                TweenMax.to(this.logoText, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.refs.close, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.links, .3, { x: '0%', ease: Power3.easeOut }),
            ]));
    }

    openComplete() {
        this.inProgress = false;
        this.article.addClass('menu-open');
        this.menuIsOpen = true;
    }

    close() {
        if (this.inProgress) return false;
        this.inProgress = true;

        this.wasFixedBurger && TweenMax.set(this.text, { x: '-100%' });
        this.wasFixedBurger && TweenMax.set(this.image, { scale: 1.1, opacity: 0 });
        //console.warn('prev color', this.prevColor);
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        console.warn('burger isLarge', isLarge);

        let timeline = new TimelineLite({
            onComplete: (() => {
                this.closeComplete();
                this.wasFixedBurger && TweenMax.set(this.text, { x: '0%' });
                this.wasFixedBurger && TweenMax.set(this.image, { scale: 1, opacity: 1 });
                this.header.removeClass('align-links-top');
                timeline = null;
            }).bind(this),
        })
            .add(_.filter([
                TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeOut }),
                TweenMax.to(this.refs.close, .3, { x: isLarge ? '-100%' : '105%', ease: Power3.easeOut }),
                TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeOut }),
            ]))
            .add(() => {
                this.header.addClass('align-links-top');
            })
            .add(_.filter([
                this.initialScroll && TweenMax.to(this.refs.burger, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                !this.initialScroll && TweenMax.to(this.links, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.logoImage, .3, { color: this.prevColor, delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.header, .6, { height: this.wasFixedBurger ? '0%' : this.initialHeight, ease: Power3.easeOut }),
            ]))
            .add(() => {
                !this.wasFixedBurger && this.article.removeClass('fix-header');
                this.header.css('height', '');
                this.article.removeClass('menu-open');
            })
            .add(_.filter([
                !this.wasFixedBurger && TweenMax.to(this.text, .3, { x: '0%', ease: Power3.easeOut }),
                !this.wasFixedBurger && TweenMax.to(this.image, .3, { scale: 1, opacity: 1, ease: Power3.easeOut }),
            ]));
    }

    closeComplete() {
        this.inProgress = false;
        $.scrollLock(false);
        setTimeout((() => {
            this.menuIsOpen = undefined;
            this.props.enableScenes();
        }).bind(this), 100);
        //this.props.enableScenes();
    }

    render() {
        return (
            <div className="hamburger" ref="hamburger">
                <i className="open ncs-bars"  onClick={this.open} ref="burger" />
                <i className="close ncs-chevron-with-circle-left" onClick={this.close} ref="close" />
            </div>
        );
    }

    showBurgerFromLeft() {
        let t = TweenMax.fromTo(this.burger, .3, { x: '-100%' }, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }
    showBurgerFromRight() {
        let t = TweenMax.fromTo(this.burger, .3, { x: '105%' }, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }

    showBurgerInstant() {
        let t = TweenMax.set(this.burger, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }
    hideBurgerLeftInstant() {
        let t = TweenMax.set(this.burger, { x: '-100%' });
        this.timeLines.push(t);
        return t;
    }
    hideBurgerRightInstant() {
        let t = TweenMax.set(this.burger, { x: '105%' });
        this.timeLines.push(t);
        return t;
    }

    hideCloseLeftInstant() {
        let t = TweenMax.set(this.close, { x: '-100%' });
        this.timeLines.push(t);
        return t;
    }
    hideCloseRightInstant() {
        let t = TweenMax.set(this.close, { x: '105%' });
        this.timeLines.push(t);
        return t;
    }

    darken() {
        let t = TweenMax.fromTo(this.burger, .3, { color: '#fefefe' }, { color: '#4d4d4d' });
        this.timeLines.push(t);
        return t;
    }
    lightInstant() {
        let t = TweenMax.set(this.burger, { color: '#fefefe' });
        this.timeLines.push(t);
        return t;
    }
    darkInstant() {
        let t = TweenMax.set(this.burger, { color: '#4d4d4d' });
        this.timeLines.push(t);
        return t;
    }
}
