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

    shouldComponentUpdate(nextProps, nextState) {
        //console.warn('Burger shouldUpdate', nextProps.transition.scrollScenesEnabled);
        this.scenes && this.scenes.forEach(scene => { scene.enabled(nextProps.transition.scrollScenesEnabled); });
        return false;
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

        this.initialHeight = 400 - $window.scrollTop();
        this.props.disableScenes();
        $.scrollLock(true);

        let color = '#fefefe';
        this.prevColor = $(this.refs.burger).css('color');
        
        this.wasFixedBurger = this.article.hasClass('fix-header');
        this.wasFixedBurger && TweenMax.set(this.text, { x: '-100%' });        
        this.wasFixedBurger && TweenMax.set(this.image, { scale: 1.1, opacity: 0 });

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
                TweenMax.to(this.refs.burger, .3, { x: '-100%', ease: Power3.easeOut }),
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
    }

    close() {
        if (this.inProgress) return false;
        this.inProgress = true;

        this.wasFixedBurger && TweenMax.set(this.text, { x: '-100%' });
        this.wasFixedBurger && TweenMax.set(this.image, { scale: 1.1, opacity: 0 });
        //console.warn('prev color', this.prevColor);
        let timeline = new TimelineLite({
            onComplete: (() => {
                this.closeComplete();
                this.wasFixedBurger && TweenMax.set(this.text, { x: '0%' }),
                this.wasFixedBurger && TweenMax.set(this.image, { scale: 1, opacity: 1 }),
                timeline = null;
            }).bind(this),
        })
            .add(_.filter([
                TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeOut }),
                TweenMax.to(this.refs.close, .3, { x: '-100%', ease: Power3.easeOut }),
                TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeOut }), 
            ]))
            .add(_.filter([
                TweenMax.to(this.refs.burger, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
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
        setTimeout((() => { this.props.enableScenes(); }).bind(this), 100);
        //this.props.enableScenes();
    }

    render() {
        return (
            <div className="hamburger" ref="container">
                <i className="open ncs-bars"  onClick={this.open} ref="burger" />
                <i className="close ncs-chevron-with-circle-left" onClick={this.close} ref="close" />
            </div>
        );
    }
}
