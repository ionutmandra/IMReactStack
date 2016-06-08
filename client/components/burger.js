import React, { Component, PropTypes } from 'react';
import dom from 'react-dom';
import _ from 'lodash';
let $ = window.$, $window = $(window), $body = $('body'), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

export default class Burger extends Component {
    constructor(props) {
        super(props);
        this.burgerClick = this.burgerClick.bind(this);
        this.timeLines = [];
        this.scenes = [];
    }
    
    componentWillUnmount() {
        if (this.scenes) {
            for (var i = 0; i < this.scenes.length; i++) {
                this.scenes[i].destroy();
                this.scenes[i] = null;
            }
        }
        if (this.timeLines) {
            for (i = 0; i < this.timeLines.length; i++) {
                this.timeLines[i] = null;
            }
        }
        if (this.controller){
            this.controller.destroy();
            this.controller = null;
        }
    }

    burgerClick(event){
        if (this.animating) {
            return false;
        }
        this.animating = true;
        let $burger = $(event.currentTarget);
        $burger.is('.is-closed') && this.openBurgerMenu() || this.closeBurgerMenu();
        $burger.toggleClass('is-closed is-open');
    }
    
    openBurgerMenu() {
        let el = this.getElements();
        let timeLines = this.timeLines, scenes = this.scenes;
        
        let animations = _.filter([
            () => { el.text.hide(); },
            TweenMax.to(el.logo, .3, { color: '#fefefe' }),
            TweenMax.to(el.burger, .3, { color: '#fefefe' }),
            TweenMax.to(el.header, .6, { height: '100%', ease: Power3.easeOut }),
        ]);
            
            //console.warn(animations);
        timeLines.push(new TimelineLite({ onComplete: this.resetAnimating.bind(this, 'disableScroll') })
            .add(animations)
            .add(el.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '0%' }); }))
        );
        
        return true; //important!
    }

    closeBurgerMenu() {
        let el = this.getElements();
        let timeLines = this.timeLines, scenes = this.scenes;
        
        let animations = _.filter([
            TweenMax.to(el.logo, .2, { color: '#4d4d4d', delay: .5 }), 
            TweenMax.to(el.burger, .2, { color: '#4d4d4d', delay: .5 }),
            TweenMax.to(el.header, .6, { height: '0%', ease: Power3.easeIn }),
        ]);
        
        timeLines.push(new TimelineLite({ onComplete: this.resetAnimating.bind(this, 'enableScroll') })
            .add(el.links.toArray().map(link => { return TweenMax.to(link, .4, { x: '-100%' }); }))
            .add(animations)
            .add(_.filter([() => { el.text.show(); el.header.css('height', ''); }]))            
        );
    }
    
    resetAnimating(fn) {
        this.animating = false;
        this[fn]();
    }
    
    getElements() {
        let burger = $(dom.findDOMNode(this.refs.hamburg)), 
            header = burger.closest('header');
        return { burger, header,
            links: header.find('nav ul li a'),
            logo: header.find('> .logo'),
            text: header.find('> .text'),
        };
    }
    
    disableScroll() {
        this._body_scrollTop = $('body').scrollTop();//self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
        $('body').css('overflow', 'hidden').scrollTop(this._body_scrollTop);
        $('root').scrollTop(this._body_scrollTop);
    }
    
    enableScroll() {
        $('body').css('overflow', 'visible').scrollTop(this._body_scrollTop);
        $('root').scrollTop(this._body_scrollTop);
    }

    render() {
    	return (
            <div className="hamburger">
                <div className="hamburglar is-closed" onClick={this.burgerClick} ref="hamburg">
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
                </div>
            </div>
        );
    }
}
