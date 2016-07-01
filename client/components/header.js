import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Contact from '../containers/contactContainer';
import Burger from '../containers/burgerContainer';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    constructor(...args) {
        super(...args);
        this.openContact = this.openContact.bind(this);
        this.closeContact = this.closeContact.bind(this);
        this.getContactPieces = this.getContactPieces.bind(this);
    }
    componentDidMount() {
        let controller = this.controller = new ScrollMagic.Controller(),
            timeLines = this.timeLines = [],
            scenes = this.scenes = {},
            header = this.header = $(this.refs.header),
            article = this.article = header.closest('article.page');
        //headerBottom = header.position().top + header.height();
        this.links = this.header.find('nav ul li a').toArray();
        this.burgerOpen = this.header.find('> .hamburger > .open');
        this.burgerClose = this.header.find('> .hamburger > .close');
        this.logoText = this.header.find('> .logo .text svg');

        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];

        if (this.props.isHomepage) {
            this.homeLeft = [
                this.article.find('.slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1, .slide-2.content .text-3 .text-content').toArray(),
                this.article.find('.slide-3.content .text-2 h1').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeRight = [
                this.article.find('.slide-1.content .text-1 h1').toArray(),
                this.article.find('.slide-2.content .text-2 .text-content').toArray(),
                this.article.find('.slide-3.content .text-1 h1').toArray(),
                {},
            ];
            this.smallHomeLeft = [
                this.article.find('.slide-1.content .text-1 h1, .slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1').toArray(),
                this.article.find('.slide-3.content .text-1 h1, .slide-3.content .text-2 h1').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeBottom = [
                this.article.find('.slide-1.content .scroll-hint > *').toArray(),
                {}, {}, {},
            ];
            this.homeImage = [
                this.article.find('.slide-1.background .img').toArray(),
                this.article.find('.slide-2.background .img').toArray(),
                this.article.find('.slide-3.background .img').toArray(),
                this.article.find('.slide-4.background .img').toArray(),
            ];

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
        let menuIsOpen = this.article.hasClass('menu-open');
        if (this.props.isHomepage) {
            this.article.addClass('fix-header');
        } else if ($window.scrollTop() < 400) {
            !menuIsOpen && this.article.removeClass('fix-header');
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
                    <HeaderLinks isHomepage openContact={this.openContact} />
                    <Burger isHomepage />
                    <Contact isHomepage renderCloseButton closeContact={this.closeContact} getContactPieces={this.getContactPieces} />
                </header>
            );
        } else {
            return (
                <header className="main" ref="header">
                    <div className="image"><div className="img" /></div>
                    <div className="gradient" />
                    <Logo />
                    <HeaderLinks openContact={this.openContact} />
                    <div className="text"><h1>{this.props.title}</h1></div>
                    <Burger />
                    <Contact renderCloseButton closeContact={this.closeContact} getContactPieces={this.getContactPieces} />
                </header>
            );
        }
    }

    ////
    //  CONTACT PAGE STUFF
    ///////////////////////////

    getContactPieces() {
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        let isMedium = this.props.ui.media.current == breakpoint.names.medium;
        let isSmall = this.props.ui.media.current == breakpoint.names.small;

        let contactPieces = { left: [], right: [] };//this.header.find('.contact .content');
        if (isLarge) {
            contactPieces.left = this.header.find('.contact .content').toArray();
        }
        if (isMedium) {
            contactPieces.left = this.header.find('.contact .right .content').toArray();
            contactPieces.right = this.header.find('.contact .left .content, .contact .btn .content').toArray();
        }
        if (isSmall) {
            contactPieces.left = this.header.find('.contact .left .content, .contact .right .content').toArray();
            contactPieces.right = this.header.find('.contact .btn .content').toArray();
        }

        return contactPieces;
    }

    openContact(event) {
        if (this.inProgress) {
            event.preventDefault();
            return false;
        }
        this.inProgress = true;
        let burgerIsOpen = this.article.hasClass('menu-open');
        let pieces = this.getContactPieces();
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        this.article.addClass('contact-open');

        if (burgerIsOpen) { //small ALL scenarios, medium ALL scenarios + Large Generic pege when burger open
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.burgerClose, .3, { x: isLarge ? '-100%' : '105%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (this.props.isHomepage) { //header contact link on Large Homepage
            let currentSlide = this.currentSlide = Math.floor($window.scrollTop() / $window.height());
            this.props.disableScenes();
            $.scrollLock(true);

            TweenMax.set(this.header, { height: '100%' });

            console.warn('slide', currentSlide);

            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.homeLeft[currentSlide], .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.homeRight[currentSlide], .3, { x: '105%', ease: Power3.easeIn }),
                    TweenMax.to(this.homeBottom[currentSlide], .3, { y: '200%', ease: Power3.easeIn }),

                    TweenMax.to(this.homeImage[currentSlide], .6, { scale: 1.1, opacity: 0, ease: Power3.easeInOut }),

                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', delay: .3, ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', delay: .3, ease: Power3.easeOut }),
                ]));
        } else { //header contact link on Large Generic page when scroll = 0
            let initialHeight = 400 - $window.scrollTop();
            this.props.disableScenes();
            $.scrollLock(true);

            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.article.find('.content-item'), .3, { x: '-110%', ease: Power3.easeOut }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.links.concat([this.logoText, this.text]), .3, { x: '-100%', ease: Power3.easeOut }),
                    TweenMax.to(this.image, .3, { scale: 1.1, opacity: 0, ease: Power3.easeOut }),
                ]))
                .add((() => {
                    this.article.addClass('fix-header');
                    this.header.height(initialHeight);
                }).bind(this))
                .add(_.filter([
                    TweenMax.to(this.header, .5, { height: '100%', ease: Power3.easeOut }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.contactPieces, .3, { x: '0%', ease: Power3.easeOut }),
                ]));
        }

        event.preventDefault();
        return false;

        function onComplete(timeline) {
            timeline = null;
            this.inProgress = false;
        }
    }

    closeContact(event) {
        if (this.inProgress) {
            event.preventDefault();
            return false;
        }
        this.inProgress = true;
        let burgerIsOpen = this.article.hasClass('menu-open');
        let pieces = this.getContactPieces();
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        let isMedium = this.props.ui.media.current == breakpoint.names.medium;

        if (burgerIsOpen) { //small ALL scenarios, medium ALL scenarios + Large Generic pege when burger open
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, false) })
                .add(_.filter([
                    TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.links, .3, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.to(this.logoText, .3, { x: '0%', ease: Power3.easeOut }),
                    //TweenMax.fromTo(this.burgerClose, .3, { x: isLarge ? '-100%' : '105%' }, { x: '0%', ease: Power3.easeIn }),
                    TweenMax.to(this.burgerClose, .3, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (this.props.isHomepage) { //header contact link on Large Homepage
            let currentSlide = this.currentSlide;

            if (isLarge) { // opened on home large, closing on home large
                let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, true) })
                    .add(_.filter([
                        TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                        TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),

                        TweenMax.to(this.homeImage[currentSlide], .6, { scale: 1, opacity: 1, ease: Power3.easeInOut }),

                        TweenMax.to(this.links, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.logoText, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeLeft[currentSlide], .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeRight[currentSlide], .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeBottom[currentSlide], .3, { y: '0%', delay: .3, ease: Power3.easeOut }),
                    ]));
            } else { // opened on home large, closing on home small/medium
                let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, true) })
                    .add(_.filter([
                        TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                        TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),

                        TweenMax.to(this.homeImage, .6, { scale: 1, opacity: 1, ease: Power3.easeInOut }),

                        isMedium && TweenMax.to(this.logoText, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeLeft, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeRight, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.homeBottom, .3, { y: '0%', delay: .3, ease: Power3.easeOut }),
                        TweenMax.to(this.burgerOpen, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                    ]));
            }
        } else { //header contact link on Large Generic page when scroll = 0
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, true) })
                .add(_.filter([
                    TweenMax.to(this.contactPieces, .3, { x: '-100%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.header, .5, { height: this.props.transition.initialHeight, ease: Power3.easeOut }),
                ]))
                .add(_.filter([
                    () => {
                        this.article.removeClass('fix-header');
                        this.header.css('height', '');
                    },
                ]))
                .add(_.filter([
                    TweenMax.to(this.links.concat([this.logoText, this.text]), .3, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.to(this.image, .3, { scale: 1, opacity: 1, ease: Power3.easeOut }),
                    TweenMax.to(this.article.find('.content-item'), .3, { x: '0%', ease: Power3.easeOut }),
                ]));
        }

        event.preventDefault();
        return false;

        function onComplete(timeline, clearScroll) {
            timeline = null;
            this.inProgress = false;
            this.article.removeClass('contact-open');
            if (clearScroll) {
                TweenMax.set(this.header, { clearProps: 'height' });
                $.scrollLock(false);
                setTimeout(this.props.enableScenes, 100);
            }
        }
    }
}

Header.propTypes = {
    //cancelScene: PropTypes.string,
    isHomepage: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;