import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import dom from 'react-dom';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class HeaderLinks extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.openContact = this.openContact.bind(this);
    }

    componentDidMount() {
        let refs = this.refs,
            timeLines = this.timeLines = [],
            scenes = this.scenes = {},
            controller = this.controller = new ScrollMagic.Controller(),
            trigger = this.article = $(refs.container).closest('article.page'),
            links = this.links = this.links.map(link => dom.findDOMNode(link));
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];
        this.header = this.article.find('header.main');
        this.contactPieces = this.header.find('.contact .content');
        this.image = this.header.find('> .image .img');
        this.logoImage = this.header.find('> .logo .img');
        this.logoText = this.header.find('> .logo .text svg');
        this.text = this.header.find('> .text h1');
        this.burgerClose = this.header.find('> .hamburger > .close');

        if (this.article.is('.page-home')) {
            this.leftTexts = [
                this.article.find('.slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1, .slide-2.content .text-3 .text-content').toArray(),
                this.article.find('.slide-3.content .text-2 h1').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.rightTexts = [
                this.article.find('.slide-1.content .text-1 h1').toArray(),
                this.article.find('.slide-2.content .text-2 .text-content').toArray(),
                this.article.find('.slide-3.content .text-1 h1').toArray(),
                {},
            ];
            this.bottomTexts = [
                this.article.find('.slide-1.content .scroll-hint > *').toArray(),
                {}, {}, {},
            ];
            this.image = [
                this.article.find('.slide-1.background .img').toArray(),
                this.article.find('.slide-2.background .img').toArray(),
                this.article.find('.slide-3.background .img').toArray(),
                this.article.find('.slide-4.background .img').toArray(),
            ];
        }

        if (this.props.stationary) return;

        ////
        // LARGE SCREEN
        ///////////////////

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            //.addIndicators({ name: 'Links 1.__' })
            .setTween(hide())
        );

        ////
        // Medium SCREEN
        ///////////////////

        scenes[breakpoint.names.medium].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            //.addIndicators({ name: 'Links 1.__' })
            .setTween(hide())
        );

        ////
        // SMALL SCREEN
        ///////////////////
        scenes[breakpoint.names.small].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            //.addIndicators({ name: 'Links 1.__' })
            .setTween(hide())
        );

        function hide() { 
            let t = [
                TweenMax.to(links, 0, { clearProps: 'all' }),
                TweenMax.to(links, 0, { x: '0%' }),
                TweenMax.to(links, .3, { x: '-100%' }),
            ]; 
            timeLines = timeLines.concat(t); 
            return t; 
        }

        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.transition.scrollScenesEnabled != nextProps.transition.scrollScenesEnabled){
            this.setScenes(this.props.ui.media.current, nextProps.transition.scrollScenesEnabled);
        }
        if(this.props.ui.media.current != nextProps.ui.media.current){
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
        this.setScenes(media.current, true);
    }

    setScenes (media, enabled) {
        //console.warn('logo setting scenes for', media, 'to', enabled,'on', this.article.attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); });
    }

    handleClick(event) {
        let burgerIsOpen = this.article.is('.menu-open');
        // burgerIsOpen && $window.scrollTop(0);
        this.props.dispatchTransition({
            type: burgerIsOpen && 'burger' || 'header',
            column: event.currentTarget.getAttribute('data-animate-line'),
            target: event.currentTarget,
        });
    }

    openContact(event) {
        let burgerIsOpen = this.article.is('.menu-open');
        let animations = [];

        if (burgerIsOpen) {
            this.props.dispatchTransition({
                type: 'contact',
                burgerIsOpen: true,
            });

            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.addClass('contact-open');
                }).bind(this)})
                .add(_.filter([
                    TweenMax.to(this.links.concat([this.logoText, this.burgerClose]), .3, { x: '-100%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.contactPieces, .3, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (this.article.is('.page-home')) {
            let currentSlide = Math.floor($window.scrollTop() / $window.height());
            this.props.dispatchTransition({
                type: 'contact',
                homePage: true,
                burgerIsOpen: false,
                currentSlide,
            });
            this.props.disableScenes();
            $.scrollLock(true);
            
            TweenMax.set(this.header, { height: '100%' });

            console.warn('slide', currentSlide);
            
            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.addClass('contact-open');
                }).bind(this)})
                .add(_.filter([
                    TweenMax.to(this.links.concat([this.logoText], this.leftTexts[currentSlide]), .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.rightTexts[currentSlide], .3, { x: '100%', ease: Power3.easeIn }),
                    TweenMax.to(this.bottomTexts[currentSlide], .3, { y: '200%', ease: Power3.easeIn }),
                    TweenMax.to(this.image[currentSlide], .6, { scale: 1.1, opacity: 0, ease: Power3.easeInOut }),
                    TweenMax.to(this.contactPieces, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                ]));
        } else {
            //generic page
            let initialHeight = 400 - $window.scrollTop();
            this.props.dispatchTransition({
                type: 'contact',
                burgerIsOpen: false,
                homePage: false,
                initialHeight,
            });

            this.props.disableScenes();
            $.scrollLock(true);

            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.addClass('contact-open');
                }).bind(this)})
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
    }

    render() {
        let links = this.links = [];
        return (<nav className="links" ref="container">
            <ul>
                <li><Link ref={c => links.push(c)} data-animate-line="3" onClick={this.handleClick} to={routePaths.client.about} >{'About'}</Link></li>
                <li><Link ref={c => links.push(c)} data-animate-line="4" onClick={this.handleClick} to={routePaths.client.expertise}>{'Expertise'}</Link></li>
                <li><Link ref={c => links.push(c)} data-animate-line="5" onClick={this.handleClick} to={routePaths.client.portfolio}>{'Portfolio'}</Link></li>
                <li><a ref={c => links.push(c)} data-animate-line="6" onClick={this.handleClick} href="https://blog.adaptabi.com">{'Blog'}</a></li>
                <li><Link ref={c => links.push(c)} data-animate-line="7" onClick={this.openContact} to={routePaths.client.contact}>{'Contact'}</Link></li>
            </ul>
        </nav>);
    }
}

HeaderLinks.propTypes = {
    animationType: PropTypes.string,
    dispatchTransition: PropTypes.func.isRequired,
    stationary: PropTypes.bool,
    strings: PropTypes.object.isRequired,
    transition: PropTypes.object,
};

HeaderLinks.defaultProps = {
    strings: {
    },
};

export default HeaderLinks;
