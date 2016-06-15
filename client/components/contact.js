import React, { Component } from 'react';
import dom from 'react-dom';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';
let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Contact extends Component {
    componentDidMount() {
        let $container = $(this.refs.container);

        console.log('Mounted Contact', this.pieces, this.refs.container, $(this.refs.container));
    }
    componentWillUnmount() {
        //console.log('Spring cleaning');
    }

    closeContact(event) {
        let el = this.getElements(), animations = [], postAnimations = [];      
        let timeLines = this.timeLines || (this.timeLines = []);
        let initialState = el.contact.toArray().map(text => { return TweenMax.set(text, { x: '0%' }); });
        
        if (this.burgerIsOpen) {
            animations = _.filter([
                    el.burger && TweenMax.to(el.burger, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),            
                ])
                .concat(el.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '0%', delay: .3, ease: Power3.easeOut }); }))
                .concat(el.contact.toArray().map(text => { return TweenMax.to(text, .3, { x: '-100%', ease: Power3.easeIn }); }));
        } else {
            el.header.addClass('align-links-top');
            initialState = initialState.concat(_.filter([
                !this.wasFixed && el.image && TweenMax.set(el.image, { scale: 2, opacity: 0 }),
            ]));
            animations = el.contact.toArray().map(text => { return TweenMax.to(text, .3, { x: '-100%', ease: Power3.easeIn }); });
            postAnimations = _.filter([
                this.wasFixed && TweenMax.to(el.logo, .6, { marginLeft: '50px', ease: Power3.easeOut }),
                this.wasFixed && TweenMax.to(el.logo, .3, { color: '#4d4d4d', delay: .3, ease: Power3.easeOut }), 
                TweenMax.to(el.burger, .3, { color: '#4d4d4d', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(el.header, .6, { height: '400px', ease: Power3.easeOut }),
                TweenMax.to(el.text, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                !this.wasFixed && el.image && TweenMax.to(el.image, .5, { opacity: 1, ease: Power3.easeIn }),
                !this.wasFixed && el.image && TweenMax.to(el.image, .6, { scale: 1, ease: Power3.easeOut }),
            ])
            .concat(el.links.toArray().map(link => { return TweenMax.to(link, .3, { x: '0%', delay: .3, ease: Power3.easeOut }); }));
        }
        
        timeLines.push(new TimelineLite({ onComplete: (() => {
                !this.burgerIsOpen && this.resetAnimating(false);
                !this.wasFixed && el.container.removeClass('fix-header');                
                el.header.removeClass('align-links-top');
                el.header.find('.contact-container .contact').css('z-index', ''); //default, less than header links
                !this.burgerIsOpen && el.header.css('height', '');
                el.logo.css('pointer-events', 'all');
            }).bind(this)})
            .add(initialState)
            .add(animations)
            .add(postAnimations)
        );

        event.preventDefault();
        return false;
    }
    render() {
        let pieces = this.pieces = [], closeButton = null;
        if (this.props.renderCloseButton) {
            closeButton = (<div className="btn" ref={c => pieces.push(c)}>
                <i className="content ncs-chevron-with-circle-left" onClick={this.closeContact} />
            </div>);
        }
        return (<div className="contact" ref="container">
            <div className="left" ref={c => pieces.push(c)}>
                <div className="content">
                    <p>Everything changes but our passion!</p>
                    <p>Come and join the <Link data-animate-line="3" onClick={this.handleClick} to={routePaths.client.about} >{'family'}</Link>.</p>
                </div>
            </div>
            <div className="right" ref={c => pieces.push(c)}>
                <ul className="content">
                    <li>Str. John doe, Nr. 2. Iasi, 123456, Romania</li>
                    <li>+40123 456 789</li>
                    <li><a href="mailto:contact@adaptabi.com">contact@adaptabi.com</a></li>
                    <li className="social-media">
                        <a target="_blank" href="http://linkedin.com"><i className="ncs-linkedin-square" /></a>
                        <a target="_blank" href="http://facebook.com"><i className="ncs-facebook-square" /></a>
                        <a target="_blank" href="http://twitter.com"><i className="ncs-twitter" /></a>
                        <a target="_blank" href="http://plus.google.com"><i className="ncs-google-plus" /></a>
                    </li>
                </ul>
            </div>
            {closeButton}
        </div>);
    }
}

export default Contact;
