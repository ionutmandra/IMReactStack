import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Burger from '../containers/burgerContainer';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    constructor(...args) {
        super(...args);
        this.setInitialScroll = this.setInitialScroll.bind(this);
        this.getInitialScroll = this.getInitialScroll.bind(this);
        this.initialScroll = undefined;
        this.timeLines = [];
    }

    setInitialScroll(scroll){
        this.initialScroll = scroll;
        this.props.setInitialScroll && this.props.setInitialScroll(scroll);
    }
    getInitialScroll(){
        if(typeof(this.initialScroll) === 'undefined' )
        {
            return $window.scrollTop();
        }
        else{
            return this.initialScroll;
        }
    }

    componentDidMount() {
        let header = this.header = $(this.refs.header);
        this.article = header.closest('article.page');
        this.links = this.header.find('nav ul li a').toArray();
        this.burgerOpen = this.header.find('.hamburger > .open');
        this.burgerClose = this.header.find('.hamburger > .close');
        this.logoText = this.header.find('.logo .text svg');
        this.logoImage = this.header.find('.logo .img');
        this.headerImage = this.header.find('.image .img');
        this.headerText = this.header.find('.text h1');

        if (this.props.isHomepage) {
            this.homeLeft = [
                this.article.find('.slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-2 h2').toArray(),
                this.article.find('.slide-3.content .text-1 h1, .slide-3.content .text-3 .text-content').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeRight = [
                this.article.find('.slide-1.content .text-1 h1').toArray(),
                this.article.find('.slide-2.content .text-1 h1').toArray(),
                this.article.find('.slide-3.content .text-2 .text-content').toArray(),
                {},
            ];
            this.smallHomeLeft = [
                this.article.find('.slide-1.content .text-1 h1, .slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1, .slide-2.content .text-2 h2').toArray(),
                this.article.find('.slide-3.content .text-1 h1').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeBottom = [
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
            ];
            this.homeImage = [
                this.article.find('.slide-1.background .img').toArray(),
                this.article.find('.slide-2.background .img').toArray(),
                this.article.find('.slide-3.background .img').toArray(),
                this.article.find('.slide-4.background .img').toArray(),
            ];
        }

        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.ui.media.current != nextProps.ui.media.current) {
            this.handleMediaChange(nextProps.ui.media);
        }
        return false;
    }

    componentWillUnmount() {
        for (let i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }
    }

    handleMediaChange(media) {
        // console.warn('header handleMediaChange', media, this.props.isHomepage, $window.scrollTop());
    }

    render() {
        if (this.props.isHomepage) {
            return (
                <header className="main" ref="header">
                    <div className="container">
                        <Logo isHomepage getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <HeaderLinks isHomepage getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll} highlightAbout={this.props.highlightAbout} highlightExpertise={this.props.highlightExpertise} highlightPortfolio={this.props.highlightPortfolio} highlightContact={this.props.highlightContact} />
                        <Burger isHomepage getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                    </div>
                </header>
            );
        } else {
            return (
                <header className="main" ref="header">
                    <div className="container">
                        <div className="image"><div className="img" /></div>
                        <div className="gradient" />
                        <div className="text"><h1>{this.props.title}</h1></div>
                        <Logo getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <HeaderLinks getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll} highlightAbout={this.props.highlightAbout} highlightExpertise={this.props.highlightExpertise} highlightPortfolio={this.props.highlightPortfolio} highlightContact={this.props.highlightContact}/>
                        <Burger getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                    </div>
                </header>
            );
        }
    }
}

Header.propTypes = {
    isHomepage: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;
