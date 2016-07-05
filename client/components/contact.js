import React, { Component } from 'react';
import dom from 'react-dom';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let $container = $(this.refs.container);
        this.article = $container.closest('article.page');
        this.header = this.article.find('header.main');
        // this.image = this.header.find('> .image .img');
        // this.logoImage = this.header.find('> .logo .img');
        // this.logoText = this.header.find('> .logo .text svg');
        // this.text = this.header.find('> .text h1');
        // this.burgerClose = this.header.find('> .hamburger > .close');
        // this.links = this.header.find('nav ul li a').toArray();
        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(' contact shouldComponentUpdate ',this.props.ui.media.current, nextProps.ui.media.current, this.props.ui.media.current != nextProps.ui.media.current );
        if (this.props.ui.media.current != nextProps.ui.media.current) {
            this.handleMediaChange(nextProps.ui.media);
        }
        return false;
    }

    handleMediaChange(media) {
        console.warn('contact handleMediaChange', media, this.props.isHomepage, $window.scrollTop());

        let contactIsOpen = this.article.hasClass('contact-open');

        if (contactIsOpen) {
            //nothing? pieces remain to 0% i.e. displayed
        } else {
            let pieces = this.getContactPieces(media);
            TweenMax.set(pieces.left, { x: '-100%' });
            TweenMax.set(pieces.right, { x: '105%' });
        }
    }

    handleClick(event) {
        this.props.dispatchTransition({
            type: 'burger',
            column: event.currentTarget.getAttribute('data-animate-line'),
            target: event.currentTarget,
        });
    }

    getContactPieces(media) {
           let isLarge = media.current == breakpoint.names.large;
           let isMedium = media.current == breakpoint.names.medium;
           let isSmall = media.current == breakpoint.names.small;

           let contactPieces = { left: [], right: [] };//this.header.find('.contact .content');
           if (isLarge) {
               contactPieces.left = this.header.find('.contact .content').toArray();
           }
           if (isMedium) {
               contactPieces.left = this.header.find('.contact .right .content').toArray();
               contactPieces.right = this.header.find('.contact .left .content, .contact .btn .content').toArray();
           }
           if (isSmall) {
               contactPieces.left = this.header.find('.contact .left .content, .contact .right .content').toArray();
               contactPieces.right = this.header.find('.contact .btn .content').toArray();
           }

           return contactPieces;
       }

    render() {
        let closeButton = null;
        if (this.props.renderCloseButton) {
            closeButton = (<div className="btn">
                <i className="content ncs-chevron-with-circle-left" onClick={this.props.closeContact} />
            </div>);
        }
        return (<div className="contact" ref="container">
            <div className="left">
                <div className="content">
                    <p>Everything changes but our passion!</p>
                    <p>Come and <Link data-animate-line="4" onClick={this.handleClick} to={routePaths.client.careers} className="join-the-family">join the family</Link>.</p>
                </div>
            </div>
            <div className="right">
                <ul className="content">
                    <li>Sos. Tudor Neculai nr. 52 D, Iasi, Romania</li>
                    <li>+40729046526</li>
                    <li><a href="mailto:contact@adaptabi.com">contact@adaptabi.com</a></li>
                    <li className="social-media">
                        <a target="_blank" href="https://www.linkedin.com/company/adaptabi"><i className="ncs-linkedin-square" /></a>
                        <a target="_blank" href="https://www.facebook.com/adaptabi/"><i className="ncs-facebook-square" /></a>
                        <a target="_blank" href="https://twitter.com/adaptabidev"><i className="ncs-twitter" /></a>
                        <a target="_blank" href="https://blog.adaptabi.com"><i className="ncs-medium" /></a>
                    </li>
                </ul>
            </div>
            {closeButton}
        </div>);
    }
}

export default Contact;
