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
        // console.warn('contact handleMediaChange', media, this.props.isHomepage, $window.scrollTop());

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
                    <p>Come and <Link data-animate-line="4" onClick={this.handleClick} to={routePaths.client.careers} className="join-the-family"><span>join</span> <span>the</span> <span>family</span></Link>.</p>
                </div>
            </div>
            <div className="right">
                <ul className="content">
                    <li className="expanded bold">Romania:</li>
                    <li className="expanded"><span className="no-break">Sos. Tudor Neculai</span> <span className="no-break">nr. 52 D,</span> <span className="no-break">Iasi,</span> 700732</li>
                    <li className="expanded"><a href="tel:+40729046526"><span>+40</span> <span>(729)</span> <span>046</span> <span>526</span></a></li>
                    <li className="expanded bold">United Kingdom:</li>
                    <li className="expanded"><span className="no-break">Prospect House,</span> <span className="no-break">2 Athenaeum Rd,</span> <span className="no-break">London,</span> <span className="no-break">N20 9AE</span></li>
                    <li className="expanded"><a href="tel:+447956809631"><span>+44</span> <span>(795)</span> <span>680</span> <span>9631</span></a></li>
                    
                    <li className="condensed">Romania: <span className="no-break">Sos. Tudor Neculai</span> <span className="no-break">nr. 52 D,</span> <span className="no-break">Iasi,</span> 700732, <a href="tel:+40729046526"><span>+40729046526</span></a></li>
                    <li className="condensed">UK: <span className="no-break">Prospect House,</span> <span className="no-break">2 Athenaeum Rd,</span> <span className="no-break">London,</span> <span className="no-break">N20 9AE,</span> <a href="tel:+447956809631"><span>+447956809631</span></a></li>
                    
                    <li className="e-mail"><span className="tag">E-mail:</span> <a href="mailto:contact@adaptabi.com">contact@adaptabi.com</a></li>
                    
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
