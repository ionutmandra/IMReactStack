import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import dom from 'react-dom';
import _ from 'lodash';

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
            scenes = this.scenes = [],
            controller = this.controller = new ScrollMagic.Controller(),
            trigger = this.article = $(refs.container).closest('article.page'),
            links = this.links.map(link => dom.findDOMNode(link));

        if (this.props.static) return;

        scenes.push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            //.addIndicators({ name: 'Links 1.__' })
            .setTween(hide())
        );

        function hide() { let t = TweenMax.to(links, .3, { x: '-100%' }); timeLines.push(t); return t; }
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
    
    handleClick(event) {
        let burgerIsOpen = this.article.is('.menu-open');        
        burgerIsOpen && $window.scrollTop(0);
        console.warn('burger', this.article, burgerIsOpen);
        this.props.transition({
            type: burgerIsOpen && 'burger' || 'header',
            column: event.currentTarget.getAttribute('data-animate-line'),
            target: event.currentTarget,
        });
    }

    openContact(event) {
        let el = this.getElements(), animations = [];      
        let timeLines = this.timeLines || (this.timeLines = []);
        let _this = this;
        this.wasFixed = el.container.hasClass('fix-header');

        if (!this.burgerIsOpen) {
            animations = _.filter([
                this.wasFixed && TweenMax.to(el.logo, .6, { color: '#fefefe', marginLeft: '12.5%', ease: Power3.easeOut })
                    || TweenMax.set(el.logo, { color: '#fefefe', marginLeft: '12.5%', ease: Power3.easeOut }),
                TweenMax.to(el.burger, .3, { color: '#fefefe', ease: Power3.easeOut }),
                TweenMax.to(el.header, .6, { height: '100%', ease: Power3.easeOut }),
            ]);
        } else {
            animations = _.filter([
                el.burger && TweenMax.to(el.burger, .3, { x: '-100%', ease: Power3.easeIn }),
                el.closeContact && TweenMax.to(el.closeContact, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
            ]);
        }
        
        animations = animations
            .concat(el.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '-100%', delay: _this.burgerIsOpen ? 0 : .3, ease: Power3.easeIn }); })
            .concat(el.contact.toArray().map(text => { return TweenMax.to(text, .3, { x: '0%', delay: _this.burgerIsOpen ? .3 : .6, ease: Power3.easeOut }); })));
        
        
        let initialState = el.contact.toArray().map(text => { return TweenMax.set(text, { x: '-100%' }); });

        let middleState = [];
        if (!this.wasFixed) {
            middleState = _.filter([
                el.image && TweenMax.to(el.image, .3, { opacity: 0, scale: 2, ease: Power3.easeIn }),
                TweenMax.to(el.text, .3, { x: '-100%', ease: Power3.easeIn }),
            ]).concat(el.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '-100%', ease: Power3.easeIn }); }));
        }        

        !this.burgerIsOpen && _this.resetAnimating(true);
        timeLines.push(new TimelineLite({ onComplete: () => {
                el.header.find('.contact-container .contact').css('z-index', '5'); //more than header links
                $(el.logo).css('pointer-events', 'all');
            }})
            .add(initialState)
            .add(middleState)
            .add(() => { el.container.addClass('fix-header'); })
            .add(animations)
        );

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
                <li><Link ref={c => links.push(c)} data-animate-line="6" onClick={this.handleClick} to={routePaths.client.careers}>{'Careers'}</Link></li>
                <li><Link ref={c => links.push(c)} data-animate-line="7" onClick={this.openContact} to={routePaths.client.contact}>{'Contact'}</Link></li>
            </ul>
        </nav>);
    }
}

HeaderLinks.propTypes = {
    animationType: PropTypes.string,
    strings: PropTypes.object.isRequired,
    transition: PropTypes.func.isRequired,
};

HeaderLinks.defaultProps = {
    strings: {
    },
};

export default HeaderLinks;