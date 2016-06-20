import React, { Component } from 'react';
import _ from 'lodash';
let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

export default class Burger extends Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        let refs = this.refs,
            timeLines = this.timeLines = [],
            scenes = this.scenes = [],
            controller = this.controller = new ScrollMagic.Controller(),
            trigger = this.article = $(refs.container).closest('article.page');

        this.header = trigger.find('header.main');
        this.image = this.header.find('> .image .img');
        this.logoImage = this.header.find('> .logo .img');
        this.logoText = this.header.find('> .logo .text svg');
        this.links = this.header.find('nav ul li a');
        this.text = this.header.find('> .text h1');

        if (this.props.stationary) return;

        scenes.push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            //.addIndicators({ name: 'Burger 1.' })
            .setTween(move())
        );

        scenes.push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 360 }).addTo(controller)
            //.addIndicators({ name: 'Burger 2.' })
            .setTween(darken())
        );

        function move() { let t = TweenMax.to(refs.burger, .3, { x: '0%' }); timeLines.push(t); return t; }
        function darken() { let t = TweenMax.to(refs.burger, .3, { color: '#4d4d4d' }); timeLines.push(t); return t; }
    }

    componentWillUnmount() {
        for (var i = 0; i < this.scenes.length; i++) {
            this.scenes[i].destroy();
            this.scenes[i] = null;
        }
        for (i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }
        this.controller.destroy();
        this.controller = null;
    }

    open() {
        if (this.inProgress) return false;
        this.inProgress = true;
        let color = '#fefefe';
        this.prevColor = $(this.refs.burger).css('color');

        let timeline = new TimelineLite({
            onComplete: (() => {
                this.openComplete();
                timeline = null; //cleanup
            }).bind(this),
        })
            .add(_.filter([
                !this.wasFixedBurger && TweenMax.to(this.text, .3, { x: '-100%', ease: Power3.easeOut }),
            ]))
            .add((() => {
                this.wasFixedBurger = this.article.hasClass('fix-header');
                this.article.addClass('fix-header');
                this.initialHeight = 400 - $window.scrollTop();
                !this.wasFixedBurger && this.header.height(this.initialHeight);
                this.disableScenes();
                $.scrollLock(true);
            }).bind(this))
            .add(_.filter([
                TweenMax.to(this.logoImage, .3, { color: color, ease: Power3.easeOut }),
                //TweenMax.to(this.logoImage, .3, { marginLeft: '12.5%', delay: .3 }),
                TweenMax.to(this.logoText, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.refs.burger, .3, { color: color, x: '-100%', ease: Power3.easeOut }),
                TweenMax.to(this.refs.close, .3, { x: '0%', delay: .3 }),
                TweenMax.to(this.header, .6, { height: '100%', ease: Power3.easeOut }),
                TweenMax.to(this.image, .6, { scale: 1.1, opacity: 0, ease: Power3.easeOut }),
            ]));//.concat(this.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '0%', delay: .3 }); }))));
    }

    openComplete() {
        this.inProgress = false;        
        this.article.addClass('menu-open');
    }

    close() {
        if (this.inProgress) return false;
        this.inProgress = true;

        let timeline = new TimelineLite({
            onComplete: (() => {
                this.closeComplete();
                this.wasFixedBurger && TweenMax.set(this.text, { x: '0%' }),
                this.wasFixedBurger && TweenMax.set(this.image, { scale: 1, opacity: 1 }),
                timeline = null;
            }).bind(this),
        })
            .add(this.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '-100%' }); }).concat([
                TweenMax.to(this.refs.close, .3, { x: '-100%' }),
                TweenMax.to(this.logoText, .3, { x: '-100%' }), 
            ]))
            .add(_.filter([
                TweenMax.to(this.refs.burger, .6, { color: this.prevColor, x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.header, .6, { height: this.wasFixedBurger ? '0%' : this.initialHeight, ease: Power3.easeOut }),
            ]))
            .add(() => {
                !this.wasFixedBurger && this.article.removeClass('fix-header');
                this.article.removeClass('menu-open');
                this.header.css('height', '');
            })
            .add(_.filter([
                !this.wasFixedBurger && TweenMax.to(this.text, .3, { x: '0%', ease: Power3.easeOut }),
                !this.wasFixedBurger && TweenMax.to(this.image, .6, { scale: 1, opacity: 1, ease: Power3.easeOut }),
            ]));
    }

    closeComplete() {
        this.inProgress = false;
        $.scrollLock(false);
        setTimeout(this.enableScenes.bind(this), 100);
    }

    enableScenes() {
        this.scenes && this.scenes.forEach(scene => { scene.enabled(true); });
        this.props.setScenes(true);
    }

    disableScenes() {
        this.scenes && this.scenes.forEach(scene => { scene.enabled(false); });
        this.props.setScenes(false);
    }

    render() {
        return (
            <div className="hamburger" ref="container">
                {/*<div className="hamburglar is-closed" onClick={this.open} ref="burger">
                    <div className="burger-icon">
                        <div className="burger-container">
                            <span className="burger-bun-top"></span>
                            <span className="burger-filling"></span>
                            <span className="burger-bun-bot"></span>
                        </div>
                    </div>
                    <div className="burger-ring">
                        <svg className="svg-ring">
                            <path className="path" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
                        </svg>
                    </div>
                    <svg width="0" height="0">
                        <mask id="mask">
                            <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
                        </mask>
                    </svg>
                    <div className="path-burger">
                        <div className="animate-path">
                            <div className="path-rotation"></div>
                        </div>
                    </div>
                </div>{/**/}
                <i className="open ncs-bars"  onClick={this.open} ref="burger" />
                <i className="close ncs-chevron-with-circle-left" onClick={this.close} ref="close" />
            </div>
        );
    }
}
