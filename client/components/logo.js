import React, { Component, PropTypes } from 'react';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';
import _ from 'lodash';
import { breakpoint } from '../config/constants';
import dom from 'react-dom';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Logo extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.setScenes = this.setScenes.bind(this);
    }

    componentDidMount() {
        let refs = this.refs,
            scenes = this.scenes = {},
            controller = this.controller = new ScrollMagic.Controller(),
            logo = this.logo = $(dom.findDOMNode(refs.logo)),
            article = this.article = logo.closest('article.page');

        this.timeLines = [];

        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];

        this.img = $(refs.img);
        this.text = $(refs.text);

        if (this.props.isHomepage) {
            this.handleMediaChange(this.props.ui.media);
            return;
        }

        ////
        // LARGE SCREEN
        ///////////////////

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: article, triggerHook: 'onLeave', offset: 1 }).addTo(controller)
            .on('start', (event => {
                if (event.scrollDirection == 'FORWARD') {
                    this.hideText();
                    //this.logo.addClass('disable-events');
                }
                if (event.scrollDirection == 'REVERSE') {
                    this.showText();
                    //this.logo.removeClass('disable-events');
                }
            }).bind(this))
        );

        scenes[breakpoint.names.large].push(new ScrollMagic.Scene({ triggerElement: article, triggerHook: 'onLeave', offset: 355 } )
            .addTo(controller)
            .setTween(this.darken()));

        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.transition.scrollScenesEnabled != nextProps.transition.scrollScenesEnabled){
            this.setScenes(this.props.ui.media.current, nextProps.transition.scrollScenesEnabled);
        }
        if(this.props.ui.media.current != nextProps.ui.media.current){
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
        if (this.props.transition.scrollScenesEnabled == true){
            this.setScenes(media.current, true);
        }

        // console.warn('logo handleMediaChange', media, this.props.isHomepage, $window.scrollTop());
        let initialScroll = this.props.getInitialScroll(),
            menuIsOpen = this.article.hasClass('menu-open'),
            contactIsOpen = this.article.hasClass('contact-open');

        if(media.current == breakpoint.names.large)
        {
            if (this.props.isHomepage) {
                this.showInstant();
            } else { //generic page
                if (initialScroll == 0) {
                    !contactIsOpen && this.showInstant();
                } else {
                    if (!menuIsOpen){
                        if (initialScroll < 355) {
                            this.lightInstant();
                            this.hideInstant();
                        } else {
                            if(this.props.transition.scrollScenesEnabled){
                                this.darkInstant();
                            }
                            this.hideInstant();
                        }
                    }
                }
            }
        } else if (media.current == breakpoint.names.medium) {
            !contactIsOpen && this.showInstant();
            this.lightInstant();
        } else if (media.current != breakpoint.names.none) {
            !menuIsOpen && this.hideInstant();
            this.lightInstant();
        }
    }

    setScenes (media, enabled) {
        //console.warn('logo setting scenes for', media, 'to', enabled,'on', this.article.attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); });
    }

    handleClick(event) {
        let burgerIsOpen = this.article.hasClass('menu-open');
        let contactIsOpen = this.article.hasClass('contact-open');
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        let isMedium = this.props.ui.media.current == breakpoint.names.medium;

        let column = 3; //small
        isMedium && (column = 3);
        isLarge && (column = 1);

        let type = 'header';
        $window.scrollTop() && (type = 'content');
        (burgerIsOpen || contactIsOpen) && (type = 'burger');

        this.props.dispatchTransition({
            type: type,
            column: column,
            target: event.currentTarget,
        });
    }

    render() {
        return (
            <Link ref="logo" to={routePaths.client.root} onClick={this.handleClick} className="logo">
                <div className="img" ref="img">
                    <svg width="36px" height="36px" viewBox="0 0 36 36">
                        <path stroke="none"  fill-rule="evenodd" d="M17.378,0.001c3.424,0,7.297,1.784,10.623,4.454
                            c-0.447-0.118-0.917-0.181-1.401-0.181c-3.004,0-5.44,2.416-5.44,5.395c0,2.98,2.436,5.395,5.44,5.395
                            c3.004,0,5.44-2.415,5.44-5.395c0-0.494-0.067-0.973-0.193-1.427c1.886,2.286,3.297,4.82,3.888,7.294
                            c0.112,0.47,0.204,0.973,0.254,1.48c0.117,1.173-0.655,1.178-1.584,0.964c-0.275-0.063-0.547-0.134-0.815-0.212
                            c-0.904-0.264-1.768-0.61-2.583-1.029c-0.392-0.201-0.874-0.049-1.076,0.339c-0.203,0.388-0.05,0.866,0.342,1.068
                            c1.399,0.719,2.436,0.979,3.887,1.394c0.618,0.177,0.87,1.011,0.302,1.427c-0.553,0.405-1.178,0.634-2.097,0.634h-9.845
                            c0.8,0.697,1.644,1.642,2.235,2.588h1.303c0.438,0,0.797,0.356,0.797,0.79l0,0c0,0.435-0.358,0.791-0.797,0.791h-0.603h-1.529
                            l0.611,1.252c0.219,0.376,0.088,0.862-0.292,1.08l0,0c-0.38,0.218-0.869,0.087-1.089-0.289c-1.798-5.15-6.528-6.202-8.584-6.211
                            v0.001L14.519,21.6c-3.007,0-5.444,2.418-5.444,5.4c0,2.982,2.437,5.4,5.444,5.4c1.002,0,1.815-0.806,1.815-1.8
                            c0-0.994-0.812-1.8-1.815-1.8v0c-1.002,0-1.815-0.806-1.815-1.8c0-0.994,0.813-1.8,1.815-1.8c3.007,0,5.444,2.418,5.444,5.4
                            c0,2.965-2.41,5.372-5.393,5.399v0l-0.052,0C6.5,36,0,29.553,0,21.6C0,13.647,6.5,7.2,14.519,7.2l0.052,0.001v0V2.7
                            c0-1.491,1.219-2.7,2.722-2.7C17.322,0,17.35,0.001,17.378,0.001L17.378,0.001z M29.09,9.541c-0.732,0-1.325-0.588-1.325-1.314
                            c0-0.726,0.593-1.314,1.325-1.314c0.731,0,1.325,0.588,1.325,1.314C30.415,8.953,29.822,9.541,29.09,9.541L29.09,9.541z" />
                    </svg>
                </div>
                <div className="text">
                    <svg ref="text" height="20px" width="96.65px" viewBox="0 0 106.337 22">
                        <path stroke="none"  fill-rule="evenodd" d="M25.837,6.106l-0.006-5.711c0-0.107,0.04-0.203,0.115-0.278
                            c0.076-0.075,0.172-0.115,0.278-0.115l1.8,0.004c0.216,0.001,0.392,0.177,0.392,0.393l0,16.492c0,0.108-0.041,0.205-0.118,0.28
                            c-0.077,0.075-0.175,0.114-0.283,0.112l-1.793-0.035c-0.214-0.004-0.385-0.179-0.385-0.393v-0.751
                            c-0.761,0.75-1.79,1.175-2.836,1.334c-1.13,0.172-2.32,0.044-3.395-0.343c-1.14-0.411-2.153-1.114-2.886-2.083
                            c-0.852-1.125-1.226-2.467-1.234-3.867c-0.007-1.276,0.299-2.513,1-3.588c0.616-0.943,1.484-1.678,2.497-2.166
                            c1.908-0.918,4.331-0.942,6.156,0.193C25.386,5.739,25.62,5.913,25.837,6.106L25.837,6.106z M66.019,3.899h0.023v0.996l4.297-0.006
                            c0.108,0,0.206,0.041,0.282,0.118c0.075,0.077,0.114,0.176,0.112,0.284L70.69,7.022c-0.005,0.213-0.18,0.383-0.393,0.383h-4.246
                            c0.004,2.18,0.042,4.361,0.039,6.539c0.013,0.758,0.777,1.078,1.426,1.143c0.441,0.044,0.903,0.006,1.335-0.092
                            c0.194-0.044,0.38-0.116,0.564-0.191c0.198-0.081,0.393-0.165,0.602-0.214c0.119-0.028,0.238-0.002,0.334,0.074
                            c0.096,0.076,0.149,0.186,0.149,0.308l0.001,1.573c0,0.165-0.098,0.308-0.251,0.367c-0.481,0.186-0.964,0.373-1.468,0.491
                            c-0.797,0.187-1.54,0.165-2.337-0.009c-1.19-0.26-2.22-0.952-2.701-2.1c-0.228-0.543-0.283-1.271-0.311-1.857
                            c-0.038-0.801-0.022-1.604-0.001-2.405l0.006-0.204V7.361H61.61c-0.108,0-0.205-0.041-0.281-0.118
                            c-0.076-0.077-0.114-0.175-0.112-0.283l0.037-1.625c0.005-0.213,0.179-0.384,0.392-0.384h1.792V3.899V1.813
                            c0-0.107,0.04-0.203,0.116-0.279c0.076-0.075,0.173-0.115,0.28-0.114l1.748,0.015c0.212,0.002,0.385,0.172,0.389,0.384L66.019,3.899
                            L66.019,3.899z M104.68,0.038c0.915,0,1.657,0.742,1.657,1.657c0,0.915-0.742,1.657-1.657,1.657c-0.915,0-1.657-0.742-1.657-1.657
                            C103.023,0.78,103.765,0.038,104.68,0.038L104.68,0.038z M103.391,16.891l0.027-11.549c0.001-0.216,0.177-0.392,0.393-0.392
                            l1.765,0.001c0.217,0,0.393,0.176,0.393,0.393l0.001,11.551c0,0.107-0.04,0.202-0.115,0.278c-0.076,0.075-0.171,0.115-0.278,0.115
                            l-1.793-0.003C103.566,17.284,103.39,17.107,103.391,16.891L103.391,16.891z M10.352,16.096c-0.008,0.008-0.016,0.015-0.025,0.022
                            c-0.205,0.185-0.431,0.347-0.663,0.498c-0.528,0.346-1.111,0.576-1.724,0.721c-1.761,0.415-3.63,0.113-5.145-0.885
                            C0.981,15.257,0.012,13.302,0,11.146C-0.012,8.95,0.983,6.96,2.836,5.756C4.357,4.767,6.229,4.47,7.987,4.905
                            C8.775,5.1,9.505,5.419,10.139,5.932c0.072,0.059,0.143,0.119,0.212,0.182l-0.001-0.769c0-0.107,0.039-0.203,0.115-0.278
                            c0.076-0.076,0.171-0.115,0.278-0.115l1.796,0c0.217,0,0.393,0.177,0.393,0.393v11.546c0,0.108-0.041,0.205-0.118,0.28
                            c-0.077,0.075-0.175,0.114-0.282,0.112l-1.793-0.035c-0.214-0.004-0.385-0.179-0.385-0.393V16.096L10.352,16.096z M82.023,16.105
                            c-0.596,0.582-1.611,1.044-2.411,1.233c-1.761,0.415-3.63,0.113-5.145-0.885c-1.815-1.196-2.783-3.151-2.796-5.307
                            c-0.013-2.288,1.014-4.305,2.998-5.488c1.707-1.017,3.893-1.245,5.751-0.516c0.583,0.229,1.125,0.55,1.601,0.957L82.02,5.345
                            c0-0.107,0.039-0.203,0.115-0.278c0.076-0.076,0.171-0.115,0.278-0.115l1.796,0c0.216,0,0.393,0.177,0.393,0.393l0,11.546
                            c0,0.108-0.041,0.205-0.118,0.28c-0.077,0.075-0.175,0.114-0.283,0.112l-1.793-0.035c-0.214-0.004-0.385-0.179-0.385-0.393V16.105
                            L82.023,16.105z M41.323,16.084c-0.104,0.097-0.21,0.192-0.321,0.281c-0.62,0.499-1.32,0.791-2.09,0.973
                            c-1.761,0.415-3.63,0.113-5.145-0.885c-1.815-1.196-2.783-3.151-2.795-5.307c-0.013-2.295,1.019-4.315,3.012-5.496
                            c1.714-1.015,3.907-1.236,5.766-0.496c0.572,0.228,1.105,0.545,1.572,0.945L41.32,5.345c0-0.107,0.039-0.203,0.115-0.278
                            c0.075-0.076,0.171-0.115,0.278-0.115l1.796,0c0.216,0,0.393,0.177,0.393,0.393v11.546c0,0.108-0.041,0.205-0.118,0.28
                            c-0.077,0.075-0.175,0.114-0.283,0.112l-1.793-0.035c-0.214-0.004-0.385-0.179-0.385-0.393V16.084L41.323,16.084z M49.784,6.137
                            c0.693-0.619,1.415-0.991,2.324-1.218c1.833-0.457,3.792-0.142,5.353,0.935c1.767,1.218,2.689,3.163,2.676,5.292
                            c-0.013,2.259-1.076,4.289-3.029,5.46c-1.505,0.903-3.328,1.147-5.023,0.705c-0.779-0.204-1.501-0.53-2.121-1.051
                            c-0.062-0.052-0.121-0.105-0.18-0.16v5.507c0,0.107-0.04,0.202-0.115,0.278C49.593,21.961,49.497,22,49.39,22l-1.793-0.003
                            c-0.217,0-0.393-0.177-0.392-0.393l0.027-16.262c0-0.216,0.177-0.392,0.393-0.392l1.758,0.001c0.215,0,0.39,0.174,0.393,0.388
                            L49.784,6.137L49.784,6.137z M90.493,6.129c0.69-0.614,1.41-0.984,2.315-1.21c1.833-0.457,3.792-0.142,5.353,0.935
                            c1.767,1.218,2.689,3.163,2.676,5.292c-0.013,2.259-1.076,4.289-3.029,5.46c-1.505,0.902-3.328,1.147-5.023,0.705
                            c-0.943-0.246-1.571-0.595-2.301-1.206v0.79c0,0.107-0.04,0.202-0.115,0.278c-0.076,0.075-0.172,0.115-0.278,0.115l-1.793-0.003
                            c-0.216,0-0.392-0.177-0.392-0.393l0.018-16.499C87.924,0.176,88.1,0,88.317,0l1.773,0.001c0.216,0,0.392,0.176,0.392,0.392
                            L90.493,6.129L90.493,6.129z M25.839,12.689c0-0.002,0-0.004,0-0.006l0.002-3.243c0-0.107,0.003-0.215,0.001-0.322
                            c-0.001-0.023-0.001-0.066-0.008-0.088c-0.015-0.048-0.113-0.168-0.146-0.211c-0.308-0.404-0.628-0.679-1.046-0.964
                            c-0.898-0.611-2.11-0.8-3.173-0.647c-0.882,0.127-1.723,0.485-2.354,1.126c-0.866,0.879-1.13,2.092-1.002,3.29
                            c0.091,0.852,0.409,1.653,1.008,2.276c0.886,0.921,2.157,1.225,3.4,1.147c0.992-0.062,2.043-0.441,2.735-1.176
                            c0.097-0.102,0.199-0.199,0.301-0.296c0.056-0.053,0.117-0.11,0.163-0.172C25.845,13.231,25.841,12.894,25.839,12.689L25.839,12.689
                            z M10.354,12.689c0-0.002,0-0.004,0-0.006l0.002-3.243c0-0.107,0.003-0.215,0.001-0.322c-0.001-0.023-0.001-0.066-0.008-0.088
                            c-0.015-0.048-0.113-0.168-0.146-0.211c-0.23-0.302-0.501-0.571-0.805-0.798c-0.98-0.734-2.213-0.985-3.414-0.812
                            C5.102,7.335,4.261,7.693,3.63,8.334c-0.866,0.879-1.131,2.092-1.002,3.29c0.136,1.268,0.743,2.318,1.882,2.93
                            C5.045,14.841,5.644,15,6.247,15.05c1.226,0.1,2.66-0.262,3.525-1.18c0.097-0.102,0.199-0.199,0.301-0.296
                            c0.056-0.053,0.117-0.11,0.163-0.172C10.36,13.231,10.356,12.894,10.354,12.689L10.354,12.689z M77.655,7.208
                            c-0.882,0.127-1.723,0.485-2.354,1.126c-0.866,0.879-1.13,2.092-1.002,3.29c0.136,1.268,0.743,2.318,1.883,2.93
                            c0.534,0.287,1.133,0.446,1.736,0.496c1.442,0.117,3.111-0.444,3.988-1.648c0.125-0.172,0.121-0.51,0.119-0.719l0.002-3.243
                            c0-0.107,0.003-0.215,0.001-0.322c-0.001-0.023-0.001-0.066-0.008-0.088c-0.015-0.049-0.113-0.168-0.146-0.211
                            c-0.23-0.302-0.501-0.571-0.805-0.798C80.089,7.287,78.856,7.035,77.655,7.208L77.655,7.208z M36.955,7.208
                            c-0.882,0.127-1.723,0.485-2.354,1.126c-0.866,0.879-1.13,2.092-1.002,3.29c0.091,0.852,0.409,1.653,1.008,2.276
                            c0.886,0.921,2.157,1.225,3.4,1.147c0.992-0.062,2.043-0.441,2.735-1.176c0.097-0.102,0.199-0.199,0.301-0.296
                            c0.056-0.053,0.117-0.11,0.163-0.172c0.125-0.172,0.121-0.51,0.119-0.719l0.002-3.243c0-0.107,0.003-0.215,0.001-0.322
                            c-0.001-0.023-0.001-0.066-0.008-0.088c-0.015-0.048-0.113-0.168-0.146-0.211c-0.308-0.404-0.628-0.679-1.046-0.964
                            C39.23,7.244,38.017,7.056,36.955,7.208L36.955,7.208z M52.83,7.2c-0.713,0.107-1.359,0.294-1.946,0.727
                            c-0.25,0.184-0.475,0.399-0.691,0.621c-0.092,0.095-0.339,0.326-0.385,0.44c-0.024,0.059-0.026,0.154-0.027,0.217
                            c-0.005,0.214,0.003,0.428,0.003,0.642c0.001,0.729,0,1.458,0,2.188c0,0.326-0.037,0.682,0.016,1.003
                            c0.04,0.24,0.136,0.428,0.291,0.613c0.269,0.321,0.672,0.589,1.029,0.804c0.959,0.575,2.216,0.722,3.305,0.524
                            c1.28-0.233,2.295-0.978,2.802-2.189c0.28-0.668,0.373-1.412,0.293-2.13c-0.064-0.573-0.238-1.137-0.523-1.639
                            c-0.366-0.647-0.899-1.168-1.569-1.494C54.619,7.131,53.71,7.068,52.83,7.2L52.83,7.2z M93.53,7.2
                            c-0.713,0.107-1.358,0.294-1.946,0.727c-0.25,0.184-0.475,0.399-0.691,0.621c-0.092,0.095-0.339,0.326-0.386,0.44
                            c-0.024,0.059-0.025,0.154-0.027,0.217c-0.005,0.214,0.003,0.428,0.003,0.642c0.001,0.729,0,1.458,0,2.188
                            c0,0.326-0.037,0.682,0.016,1.003c0.04,0.24,0.136,0.428,0.291,0.613c0.269,0.322,0.672,0.589,1.029,0.804
                            c0.959,0.575,2.216,0.722,3.305,0.524c1.28-0.233,2.295-0.978,2.802-2.189c0.28-0.668,0.373-1.412,0.293-2.13
                            c-0.064-0.573-0.238-1.137-0.523-1.639c-0.366-0.647-0.899-1.168-1.569-1.494C95.319,7.131,94.41,7.068,93.53,7.2L93.53,7.2z"/>
                    </svg>
                </div>
            </Link>
        );
    }

    hideInstant() {
        let t = TweenMax.set(this.text, { x: '-100%' });
        this.timeLines.push(t);
        return t;
    }
    showInstant() {
        let t = TweenMax.set(this.text, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }

    lightInstant() {
        let t = TweenMax.set(this.img, { color: '#fefefe' });
        this.timeLines.push(t);
        return t;
    }
    darkInstant() {
        let t = TweenMax.set(this.img, { color: '#4d4d4d' });
        this.timeLines.push(t);
        return t;
    }

    hideText() {
        let t = TweenMax.to(this.text, .35, { x: '-100%' });
        this.timeLines.push(t);
        return t;
    }
    showText() {
        let t = TweenMax.to(this.text, .35, { x: '0%' });
        this.timeLines.push(t);
        return t;
    }
    darken() {
        let t = TweenMax.fromTo(this.img, .35, { color: '#fefefe' }, { color: '#4d4d4d' });
        this.timeLines.push(t);
        return t;
    }
    lighten() {
        let t = TweenMax.fromTo(this.img, .35, { color: '#4d4d4d' }, { color: '#fefefe' });
        this.timeLines.push(t);
        return t;
    }
}

Logo.propTypes = {
    dispatchTransition: PropTypes.func.isRequired,
    isHomepage: PropTypes.bool,
    transition: PropTypes.object,
};

export default Logo;
