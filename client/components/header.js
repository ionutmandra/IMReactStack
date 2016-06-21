import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Contact from '../containers/contactContainer';
import Burger from '../containers/burgerContainer';
import _ from 'lodash';
import dom from 'react-dom';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    componentDidMount() {
        let controller = this.controller = new ScrollMagic.Controller(),
            timeLines = this.timeLines = [],
            scenes = this.scenes = [],
            $header = $(this.refs.header),
            $container = $header.parent();
            //headerBottom = $header.position().top + $header.height();
        if (this.props.stationary) return;
        
        //change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function (newpos) {
            var t = TweenMax.to(window, .7, { scrollTo: { y: newpos }, ease: Power3.easeOut });
            timeLines.push(t);
            return t;
        });

        scenes.push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 1, offset: 0 }).addTo(controller)
            //.addIndicators({name:'Scene 1'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    console.log('header sc1 end forw');
                    //controller.scrollTo(headerBottom);
                    $container.addClass('links-hidden');                    
                }
                if (event.scrollDirection == 'REVERSE') {
                    $container.removeClass('links-hidden');
                }
            })
        );

        scenes.push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 40, offset: 360 }).addTo(controller)
            //.addIndicators({name:'Scene 2'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    $container.addClass('fix-header');
                    console.log('header sc2 end forw');
                }
                if (event.scrollDirection == 'REVERSE') {
                    $container.removeClass('fix-header');
                    //controller.scrollTo(0);
                    console.log('header sc1 pr rev');
                }
            })
        );
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

    shouldComponentUpdate (nextProps, nextState) {
        console.warn('Header shouldUpdate', nextProps.transition.scrollScenesEnabled);
        this.scenes && this.scenes.forEach(scene => { scene.enabled(nextProps.transition.scrollScenesEnabled); });
        return false;
    }

    render() {
        if (this.props.stationary) {
            return (
                <header className="main" ref="header">
                    <Logo stationary />
                    <HeaderLinks stationary />     
                    <Contact stationary renderCloseButton />                                 
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
    stationary: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;