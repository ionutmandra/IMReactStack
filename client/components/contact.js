import React, { Component } from 'react';
import dom from 'react-dom';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';
import _ from 'lodash';
let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Contact extends Component {
    constructor(props) {
        super(props);
        this.closeContact = this.closeContact.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let $container = $(this.refs.container);
        this.article = $container.closest('article.page');
        this.header = this.article.find('header.main');
        this.contactPieces = this.header.find('.contact .content');
        this.image = this.header.find('> .image .img');
        this.logoImage = this.header.find('> .logo .img');
        this.logoText = this.header.find('> .logo .text svg');
        this.text = this.header.find('> .text h1');
        this.burgerClose = this.header.find('> .hamburger > .close');
        this.links = this.header.find('nav ul li a').toArray();

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
    }

    closeContact(event) {
        let burgerIsOpen = this.props.transition.burgerIsOpen;

        if (burgerIsOpen) {
            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.removeClass('contact-open');
                }).bind(this)})
                .add(_.filter([
                    TweenMax.to(this.contactPieces, .3, { x: '-100%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.to(this.links.concat([this.logoText, this.burgerClose]), .3, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (this.props.transition.homePage) {
            let currentSlide = this.props.transition.currentSlide;
            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.removeClass('contact-open');
                    TweenMax.set(this.header, { height: '' });
                    $.scrollLock(false);
                    setTimeout((() => { this.props.enableScenes(); }).bind(this), 100);
                }).bind(this)})
                .add(_.filter([
                    TweenMax.to(this.contactPieces, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.links.concat([this.logoText], this.leftTexts[currentSlide]), .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                    TweenMax.to(this.rightTexts[currentSlide], .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                    TweenMax.to(this.bottomTexts[currentSlide], .3, { y: '0%', delay: .3, ease: Power3.easeOut }),
                    TweenMax.to(this.image[currentSlide], .6, { scale: 1, opacity: 1, ease: Power3.easeInOut }),
                ]));
        } else {
            let timeline = new TimelineLite({
                onComplete: (() => {
                    timeline = null;
                    this.article.removeClass('contact-open');
                    $.scrollLock(false);
                    setTimeout((() => { this.props.enableScenes(); }).bind(this), 100);
                }).bind(this)})
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
                    TweenMax.to(this.article.find('.content-item'), .3, { x: '0%', ease: Power3.easeOut })
                ]));
        }

        event.preventDefault();
        return false;
    }

    handleClick(event) {
        this.props.dispatchTransition({
            type: 'burger',
            column: event.currentTarget.getAttribute('data-animate-line'),
            target: event.currentTarget,
        });
    }

    render() {
        let pieces = this.pieces = [], closeButton = null;
        if (this.props.renderCloseButton) {
            closeButton = (<div className="btn" ref={c => pieces.push(c) }>
                <i className="content ncs-chevron-with-circle-left" onClick={this.closeContact} />
            </div>);
        }
        return (<div className="contact" ref="container">
            <div className="left" ref={c => pieces.push(c) }>
                <div className="content">
                    <p>Everything changes but our passion!</p>
                    <p>Come and <Link data-animate-line="4" onClick={this.handleClick} to={routePaths.client.careers} className="join-the-family">join the family</Link>.</p>
                </div>
            </div>
            <div className="right" ref={c => pieces.push(c) }>
                <ul className="content">
                    <li>Sos. Tudor Neculai nr. 52 D, Iasi, Romania</li>
                    <li>+40729046526</li>
                    <li><a href="mailto:contact@adaptabi.com">contact@adaptabi.com</a></li>
                    <li className="social-media">
                        <a target="_blank" href="https://www.linkedin.com/company/adaptabi"><i className="ncs-linkedin-square" /></a>
                        <a target="_blank" href="https://www.facebook.com/Adaptabi-1562569510739468"><i className="ncs-facebook-square" /></a>
                        <a target="_blank" href="https://twitter.com/adaptabidev"><i className="ncs-twitter" /></a>
                    </li>
                </ul>
            </div>
            {closeButton}
        </div>);
    }
}

export default Contact;
