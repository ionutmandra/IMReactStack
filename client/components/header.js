import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Contact from '../containers/contactContainer';
import Burger from './burger';
import _ from 'lodash';
import dom from 'react-dom';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    constructor(props) {
        super(props);
        this.setScenes = this.setScenes.bind(this);
    }

    componentDidMount() {
        let controller = this.controller = new ScrollMagic.Controller(),
            timeLines = this.timeLines = [],
            scenes = this.scenes = [],
            $header = $(this.refs.header),
            $container = $header.parent(),
            headerBottom = $header.position().top + $header.height();
        if (this.props.linksOnly) return;
        
        //change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function (newpos) {
            var t = TweenMax.to(window, .7, { scrollTo: { y: newpos }, ease: Power3.easeOut });
            timeLines.push(t);
            return t;
        });

        scenes.push(new ScrollMagic.Scene({ triggerElement: $container, triggerHook: 'onLeave', duration: 90, offset: 0 }).addTo(controller)
            //.addIndicators({name:'Scene 1'})
            .on('end', event => {
                if (event.scrollDirection == 'FORWARD') {
                    console.log('header sc1 end forw');
                    //controller.scrollTo(headerBottom);
                }
            })
            .on('progress', event => {
                if (event.scrollDirection == 'FORWARD' && event.progress > .3) {
                    $container.addClass('links-hidden');
                    console.log('header sc1 pr fw');
                }
                if (event.scrollDirection == 'REVERSE' && event.progress <= .3) {
                    $container.removeClass('links-hidden');
                    console.log('header sc1 pr rev');
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
                    controller.scrollTo(0);
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
        // this.setState({
        //     likesIncreasing: nextProps.likeCount > this.props.likeCount
        // });
        
        if(nextProps.cancelScene == 'true'){
            
            console.log('this.disableScenes');
            this.disableScenes();
        }
        
        return false;
    }

    setScenes(status) {
        this.scenes && this.scenes.forEach(scene => { scene.enabled(status); });
        console.warn(this.refs.logo);
        this.refs.logo.setScenes(status);
    }

    render() {
        if (this.props.linksOnly) {
            return (
                <header className="main" ref="header">
                    <Logo ref="logo" />
                    <HeaderLinks />     
                    <Burger setScenes={this.setScenes} />
                    <Contact renderCloseButton />                                 
                </header>
            );
        } else {
            return (
                <header className="main" ref="header">
                    <div className="image"><div className="img" /></div>
                    <div className="gradient" />
                    <Logo ref="logo" />
                    <HeaderLinks />      
                    <div className="text"><h1>{this.props.title}</h1></div>
                    <Burger setScenes={this.setScenes} />    
                    <Contact renderCloseButton />      
                </header>
            );
        }
    }
}

Header.propTypes = {
    linksOnly: PropTypes.bool,
    title: PropTypes.string,
    cancelScene: PropTypes.string
};

export default Header;