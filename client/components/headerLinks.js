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
    }

    componentDidMount() {
        let refs = this.refs,
            scenes = this.scenes = {},
            controller = this.controller = new ScrollMagic.Controller(),
            trigger = this.article = $(refs.container).closest('article.page');

        this.timeLines = [];
        this.links = this.links.map(link => dom.findDOMNode(link));
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];

        this.header = this.article.find('header.main');
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

        if (this.props.isHomepage) {
            this.handleMediaChange(this.props.ui.media);
            return;
        }

        ////
        // LARGE SCREEN
        ///////////////////

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: trigger, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            .on('start', (event => {
                //console.error('STARTED headerLinks scene');
                if (event.scrollDirection == 'FORWARD') {
                    this.hide();
                }
                if (event.scrollDirection == 'REVERSE') {
                    this.show();
                }
            }).bind(this))
        );

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
            this.setScenes(name, false);
        }
        if (this.props.transition.scrollScenesEnabled == true) {
            this.setScenes(media.current, true);
        }

        //console.warn('headerLinks handleMediaChange', media, this.props.isHomepage, $window.scrollTop());
        let scrollTop = $window.scrollTop(), menuIsOpen = this.article.hasClass('menu-open');
        var contactIsOpen = this.article.hasClass('contact-open');

        if(media.current == breakpoint.names.large){
            if (this.props.isHomepage) {
                if(!contactIsOpen ){
                    this.showInstant();
                }
            }
            //generic page
            else{
                if(!menuIsOpen){
                    if(scrollTop == 0){
                        this.showInstant();
                    }
                }
            }
        } else if (media.current != breakpoint.names.none) {
            if (menuIsOpen && !contactIsOpen) {
                this.showInstant();
            } else {
                this.hideInstant();
            }
        }
    }

    setScenes(media, enabled) {
        //console.warn('logo setting scenes for', media, 'to', enabled,'on', this.article.attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); });
    }

    handleClick(event) {
        let burgerIsOpen = this.article.hasClass('menu-open');
        // burgerIsOpen && $window.scrollTop(0);
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        let isMedium = this.props.ui.media.current == breakpoint.names.medium;

        let column = 3; //small
        isMedium && (column = 3);
        isLarge && (column = event.currentTarget.getAttribute('data-animate-line'));

        this.props.dispatchTransition({
            type: burgerIsOpen && 'burger' || 'header',
            column: column,
            target: event.currentTarget,
        });
    }

    render() {
        let links = this.links = [];
        return (<nav className="links" ref="container">
            <ul>
                <li><Link ref={c => links.push(c) } data-animate-line="3" onClick={this.handleClick} to={routePaths.client.about} >{'About'}</Link></li>
                <li><Link ref={c => links.push(c) } data-animate-line="4" onClick={this.handleClick} to={routePaths.client.expertise}>{'Expertise'}</Link></li>
                <li><Link ref={c => links.push(c) } data-animate-line="5" onClick={this.handleClick} to={routePaths.client.portfolio}>{'Portfolio'}</Link></li>
                <li><a ref={c => links.push(c) } data-animate-line="6" onClick={this.handleClick} href="https://blog.adaptabi.com">{'Blog'}</a></li>
                <li><Link ref={c => links.push(c) } data-animate-line="7" onClick={this.props.openContact} to={routePaths.client.contact}>{'Contact'}</Link></li>
            </ul>
        </nav>);
    }

    hide() {
        //console.warn('headerLinks hide');
        let t = TweenMax.to(this.links, .35, { x: '-105%' });
        this.timeLines.push(t);
        return t;
    }

    show() {
        //console.warn('headerLinks show');
        let t = TweenMax.to(this.links, .35, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }

    hideInstant() {
        //console.warn('headerLinks hideInstant');
        let t = TweenMax.set(this.links, { x: '-105%' });
        this.timeLines.push(t);
        return t;
    }

    showInstant() {
        //console.warn('headerLinks showInstant');
        let t = TweenMax.set(this.links, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }
}

HeaderLinks.propTypes = {
    animationType: PropTypes.string,
    dispatchTransition: PropTypes.func.isRequired,
    isHomepage: PropTypes.bool,
    openContact: PropTypes.func.isRequired,
    strings: PropTypes.object.isRequired,
    transition: PropTypes.object,
};

HeaderLinks.defaultProps = {
    strings: {
    },
};

export default HeaderLinks;
