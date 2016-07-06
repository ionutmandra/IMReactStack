import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import { Link, browserHistory } from 'react-router';
import { breakpoint } from '../config/constants';
import routePaths from '../../common/routePaths';

let $ = window.$, ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Circ = window.Circ, Linear = window.Linear, TimelineMax = window.TimelineMax, TweenPlugin = window.TweenPlugin, $window = $(window);

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.setInitialScroll = this.setInitialScroll.bind(this);
        this.getInitialScroll = this.getInitialScroll.bind(this);
        this.initialScroll = undefined;

        var _this = this;
        var controller = this.controller = new ScrollMagic.Controller();
        var timeLines = this.timeLines = [];
        var scenes = this.scenes = {};
        scenes[breakpoint.names.large] = [];
        scenes[breakpoint.names.medium] = [];
        scenes[breakpoint.names.small] = [];
        this.animations = getAnimationUtils(this, controller, timeLines, scenes);
    }

    setInitialScroll(scroll) {
        this.initialScroll = scroll;
    }

    getAnimations(section) {
        var animations;

        switch (section) {
            case '2':
                animations = {
                    leftHide: [this._inputGrow, this._inputValuesRight],
                    rightHide: [this._inputValuesLeft],
                };
                break;
            case '3':
                animations = {
                    leftHide: [this._inputCreating],
                    rightHide: [this._inputOffering],
                };
                break;
            case '4':
                animations = {
                    leftHide: [this._inputSustaining],
                    rightHide: [this._inputOffering],
                };
                break;
        }

        if (this.props.ui.media.current == breakpoint.names.small || this.props.ui.media.current == breakpoint.names.medium) {
            switch (section) {
                case '2':
                    animations.instantHide = [this._inputCreating, this._inputSustaining, this._inputCreate, this._inputOffering, this._inputSoftware];
                    break;
                case '3':
                    animations.instantHide = [this._inputGrow, this._inputValuesRight, this._inputSustaining, this._inputCreate, this._inputValuesLeft, this._inputSoftware];
                    break;
                case '4':
                    animations.instantHide = [this._inputGrow, this._inputValuesRight, this._inputCreating, this._inputCreate, this._inputOffering, this._inputValuesLeft, this._inputSoftware];
                    break;
            }

            animations.instantHide.push(this._scrollHintContainer);
        }

        animations.images = [this._img1, this._img2, this._img3, this._img4];

        return animations;
    }

    handleLinkClick(event) {

        this.setScenes(this.props.ui.media.current, false);

        this.props.disableScenes();

        this.props.dispatchTransition({
            type: 'home_content',
            column: event.target.getAttribute('data-animate-line'),
            target: event.target,
            animations: this.getAnimations(event.target.getAttribute('data-section')),
        });
    }

    handleHintClick(event) {
        // let height = $window.height();
        // var fullHeight = height * 4;
        // var scroll = $window.scrollTop();
        // let container = dom.findDOMNode(ref), $container = $(container).addClass('overlap'), height = $window.height(), fullHeight = height * 4;
        // let slide = '.slide-' + Math.round((fullHeight - scroll) / fullHeight);
        if (this.scrolling) return;
        let height = $window.height(),
            scroll = $window.scrollTop() + 1,
            slide = Math.ceil(scroll / height);

        if (slide > 3) {
            //navigate to About Page
            this.props.dispatchTransition({
                type: 'home_content',
                column: 3,
                target: event.target,
                animations: this.getAnimations('4'),
            });

            browserHistory.push(routePaths.client.about);
        } else {
            this.scrolling = true;
            this.controller.scrollTo(slide * height);
            setTimeout((() => { this.scrolling = false; }).bind(this), 800);
        }
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

    componentDidMount() {

        var controller = this.controller;
        var scenes = this.scenes[breakpoint.names.large];
        var timeLines = this.timeLines;
        var _this = this;

        this.article = $(this.refs.article);

        var gradients = ['#d6cb26', '#68bc45', '#1895a3', '#4f2063', '#c80786', '#ed2f2e'];

        TweenPlugin.activate(['colorProps']);

        //scenes
        this.animations.animateGradients(breakpoint.names.large, [this._section1, this._section2, this._section3], gradients);
        this.animations.animateGradients(breakpoint.names.medium, [this._section1, this._section2, this._section3], gradients);
        this.animations.animateGradients(breakpoint.names.small, [this._section1, this._section2, this._section3], gradients);


        this.animations.pinSections([this._section1, this._section2, this._section3, this._section4], breakpoint.names.large);
        this.animations.pinSections([this._section1b, this._section2b, this._section3b, this._section4b], breakpoint.names.large);
        this.animations.pinSections([this._section1c, this._section2c, this._section3c, this._section4c], breakpoint.names.large);

        //timeLines.push(TweenMax.set(this._hintTr, { height:'0%' }));
        // timeLines.push(TweenMax.set(this._hintTl, { height:'0%' }));
        // timeLines.push(TweenMax.set(this._hintBr, { height:'0%' }));
        // timeLines.push(TweenMax.set(this._hintBl, { height:'0%' }));

        this.handleMediaChange(this.props.ui.media);

        // change behaviour of controller to animate scroll instead of jump
        this.t0 = new Date().getTime();
        controller.scrollTo(function (newpos) {
            let t1 = new Date().getTime(), duration = 0.7;
            if (t1 - this.t0 < 250) {
                //console.log('INSTANT SCROLL');
                duration = 0;
            } else {
                //console.log('ANIMATED SCROLL');
            }
            var t = TweenMax.to(window, duration, { scrollTo: { y: newpos } });
            timeLines.push(t);
            return t;
        });

        this._scrollHintBar = $(this._scrollHintBar);
        this.animations.setHintProgressInstant(this._scrollHintBar, { val: 25 });

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '99%', offset: 1 })
            .addTo(controller)
            .setTween(this.animations.setHintProgress(this._scrollHintBar, 25, 50)));
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '99%', offset: 1 })
            .addTo(controller)
            // .addIndicators({name:'1'})
            .on('start', (event) => {
                if (event.scrollDirection == 'FORWARD') {
                    // console.log('scene section 1 forward to section 2');
                    controller.scrollTo(_this._section2);
                }
            })
            .on('end', (event) => {
                if (event.scrollDirection == 'REVERSE') {
                    // console.log('scene section 2 reverse to section 1');
                    controller.scrollTo(0);
                }
            })
            .setTween(new TimelineMax()
                .add([
                    this.animations.moveLeft(this._inputCreate),
                    this.animations.moveRight(this._inputSoftware),
                    this.animations.hideImg(this._img1),
                ])
                .add(this.animations.hideSlide(this._section1c))
                .add(this.animations.showSlide(this._section2c))
                .add([
                    this.animations.moveToInitial(this._inputGrow),
                    this.animations.moveToInitial(this._inputValuesLeft),
                    this.animations.moveToInitial(this._inputValuesRight),
                    this.animations.showImg(this._img2),
                ])));

        //section2
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 1, duration: '97%' })
            .addTo(controller)
            .setTween(this.animations.setHintProgress(this._scrollHintBar, 50, 75)));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 1, duration: '97%' })
            .addTo(controller)
            //.addIndicators({name:'2'})
            .on('start', (event) => {
                if (event.scrollDirection == 'FORWARD') {
                    // console.log('scene section 2 forward to section 3');
                    controller.scrollTo(_this._section3);
                }
            })
            .on('end', (event) => {
                if (event.scrollDirection == 'REVERSE') {
                    // console.log('scene section 3 reverse to section 2');
                    controller.scrollTo(_this._section2);
                }
            })
            .setTween(new TimelineMax()
                .add([
                    this.animations.moveLeft(this._inputGrow),
                    this.animations.moveRight(this._inputValuesLeft),
                    this.animations.moveLeft(this._inputValuesRight),
                    this.animations.hideImg(this._img2),
                ])
                .add(this.animations.hideSlide(this._section2c))
                .add(this.animations.showSlide(this._section3c))
                .add([
                    this.animations.moveToInitial(this._inputCreating),
                    this.animations.moveToInitial(this._inputOffering),
                    this.animations.showImg(this._img3),
                ]))
        );

        //section3
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 1, duration: '94%' })
            .addTo(controller)
            .setTween(new TimelineMax()
                .add([
                    this.animations.setHintProgress(this._scrollHintBar, 75, 100),
                    TweenMax.to(_this._scrollArrow, 1, { rotation: '-90deg' }),
                ]))
        );

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 1, duration: '94%' })
            .addTo(controller)
            //.addIndicators({name:'3'})
            .on('start', (event) => {
                if (event.scrollDirection == 'FORWARD') {
                    //console.log('scene section 3 forward to section 4');
                    controller.scrollTo(_this._section4);
                }
            })
            .on('end', (event) => {
                if (event.scrollDirection == 'REVERSE') {
                    //console.log('scene section 4 reverse to section 3');
                    controller.scrollTo(_this._section3);
                }
            })
            .setTween(new TimelineMax()
                .add([
                    this.animations.moveLeft(this._inputCreating),
                    this.animations.moveRight(this._inputOffering),
                    this.animations.hideImg(this._img3),
                ])
                .add(this.animations.hideSlide(this._section3c))
                .add(this.animations.showSlide(this._section4c))
                .add([
                    this.animations.moveToInitial(this._inputSustaining),
                    this.animations.showImg(this._img4),
                ]))
        );
    }

    handleMediaChange(media) {

        var height = $window.height();
        var fullHeight = height * 4;
        var initialScroll = this.getInitialScroll();

        var sections = [this._section1, this._section2, this._section3, this._section4];
        var sectionsContent = [this._section1c, this._section2c, this._section3c, this._section4c];
        var images = [this._img1, this._img2, this._img3, this._img4];
        var homeLeft = [
            this.article.find('.slide-1.content .text-2 h2').toArray(),
            this.article.find('.slide-2.content .text-1 h1, .slide-2.content .text-3 .text-content').toArray(),
            this.article.find('.slide-3.content .text-2 h1').toArray(),
            this.article.find('.slide-4.content .text-1 h1').toArray(),
        ];
        var homeRight = [
            this.article.find('.slide-1.content .text-1 h1').toArray(),
            this.article.find('.slide-2.content .text-2 .text-content').toArray(),
            this.article.find('.slide-3.content .text-1 h1').toArray(),
            {},
        ];
        var smallHomeLeft = [
            this.article.find('.slide-1.content .text-1 h1, .slide-1.content .text-2 h2').toArray(),
            this.article.find('.slide-2.content .text-1 h1').toArray(),
            this.article.find('.slide-3.content .text-1 h1, .slide-3.content .text-2 h1').toArray(),
            this.article.find('.slide-4.content .text-1 h1').toArray(),
        ];
        var homeBottom = [
            this.article.find('.slide-1.content .scroll-hint > *').toArray(),
            {}, {}, {},
        ];

        var contactIsOpen = this.article.hasClass('contact-open');
        var menuIsOpen = this.article.hasClass('menu-open');

        //console.warn('handleMediaChange', media, 'on', $(this.refs.header).closest('article').attr('class'));
        for (let name in breakpoint.names) {
            this.setScenes(name, false);
        }
        if (media.current != breakpoint.names.large && this.props.transition.scrollScenesEnabled == true) {
            this.setScenes(media.current, true);
        }

        if (media.current == breakpoint.names.large) {
            //Scrolling to top
            $window.scrollTop(0);
            setTimeout((()=>{
                this.setScenes(media.current, true);
            }).bind(this), 150);

            this.timeLines.push(TweenMax.set(this._gradient, { background: 'linear-gradient(45deg, #d6cb26 0%, #68bc45 100%)' }));

            for (let i = 1; i < 4; i++) {
                this.animations.hideSlide(sectionsContent[i]);
                this.animations.hideImgInstant(images[i]);
                this.animations.hideLeft(homeLeft[i]);
                this.animations.hideRight(homeRight[i]);
            }

            // var currentSlide = 0;

            // if (media.prev == breakpoint.names.medium || media.prev == breakpoint.names.small) {
            //     currentSlide = Math.round((initialScroll) / height);
            //     this.controller.scrollTo(sections[currentSlide]);
            // }
            // else {
            //     currentSlide = Math.floor((initialScroll) / height);
            // }

            // for (let i = 0; i < 4; i++) {
            //     if (currentSlide != i) {
            //         this.animations.hideSlide(sectionsContent[i]);
            //         this.animations.hideImgInstant(images[i]);
            //         this.animations.hideLeft(homeLeft[i]);
            //         this.animations.hideRight(homeRight[i]);
            //     }
            // }

            if (menuIsOpen && !contactIsOpen) {
                this.article.removeClass('menu-open');
                this.animations.showSlide(sectionsContent[0]);
                this.animations.showImgInstant(images[0]);
                this.animations.moveToInitialInstant(homeLeft[0]);
                this.animations.moveToInitialInstant(homeRight[0]);
            }
        }
        else if (media.current != breakpoint.names.none) {
            //var currentSlide = Math.round((initialScroll) / height);

            if (contactIsOpen) {
                for (let i = 0; i < 4; i++) {
                    this.animations.showSlide(sectionsContent[i]);
                }
            }
            else {
                for (let i = 0; i < 4; i++) {
                    this.animations.showSlide(sectionsContent[i]);
                    this.animations.showImgInstant(images[i]);
                    this.animations.moveToInitialInstant(homeLeft[i]);
                    this.animations.moveToInitialInstant(homeRight[i]);
                }
            }
        }
    }

    setScenes(media, enabled) {
        //console.warn('header setting scenes for', media, 'to', enabled,'on',$(this.refs.header).closest('article').attr('class'));
        this.scenes && this.scenes[media] && this.scenes[media].forEach(scene => { scene.enabled(enabled); });
    }

    getInitialScroll() {
        if (typeof (this.initialScroll) === 'undefined') {
            return $window.scrollTop();
        }
        else {
            return this.initialScroll;
        }
    }

    render() {
        //const s = this.props.strings;
        return (
            <article className="page page-home" ref="article">
                <Header isHomepage setInitialScroll={this.setInitialScroll}  />

                <section className="slide slide-1 background" ref={(c) => this._section1b = c}>
                    <div ref={(c) => this._img1 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-2 background" ref={(c) => this._section2b = c}>
                    <div ref={(c) => this._img2 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-3 background" ref={(c) => this._section3b = c}>
                    <div ref={(c) => this._img3 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-4 background" ref={(c) => this._section4b = c}>
                    <div ref={(c) => this._img4 = c} className="image"><div className="img" /></div>
                </section>

                <div className="gradient" ref={(c) => this._gradient = c}/>

                <section className="slide slide-1 content"  ref={(c) => this._section1c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSoftware = c}>{'Software Innovators Happily Together'}</h1></div>
                    <div className="text-2">
                        <h2 ref={(c) => this._inputCreate = c}>
                            <p>Our vision is to create a truly remarkable working environment and deliver high quality, innovative software</p>
                        </h2>
                    </div>
                </section>

                <section className="slide slide-2 content"  ref={(c) => this._section2c = c}>
                    <div className="text-1">
                        <h1 ref={(c) => this._inputGrow = c}>
                            <p>Grow an outstanding</p>
                            <p>working environment driven</p>
                            <p>by <Link to="/about#ourculture" data-animate-line="3" data-section="2" onClick={this.handleLinkClick}>our culture</Link></p>
                        </h1>
                    </div>
                    <div className="text-2">
                        <div className="text-content" ref={(c) => this._inputValuesLeft = c}>
                            <h2>HAPPINESS</h2>
                            <h2>TRUST</h2>
                            <h2>PROFESSIONALISM</h2>
                            <h2>ADAPTABILITY</h2>
                        </div>
                    </div>
                    <div className="text-3">
                        <div className="text-content" ref={(c) => this._inputValuesRight = c}>
                            <h2>PASSION</h2>
                            <h2>PURPOSE</h2>
                            <h2>COMMUNICATION</h2>
                            <h2>INNOVATION</h2>
                        </div>
                    </div>
                </section>

                <section className="slide slide-3 content" ref={(c) => this._section3c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputOffering = c}>Offering highest quality by constantly improving our <Link to="/expertise" data-animate-line="3" data-section="3" onClick={this.handleLinkClick}>skills and processes</Link></h1></div>
                    <div className="text-2"><h1 ref={(c) => this._inputCreating = c}>Creating <Link to="/portfolio/sfb" data-animate-line="5" data-section="3" onClick={this.handleLinkClick}>high impact software solutions</Link> that help business succeed
                    </h1></div>
                </section>

                <section className="slide slide-4 content"  ref={(c) => this._section4c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSustaining = c} >Sustaining <Link to="/about#ourculture" data-animate-line="3" data-section="4" onClick={this.handleLinkClick}>learning and innovation</Link> as a part day to day activity.</h1></div>
                </section>

                <div className="scroll-hint" ref={(c) => this._scrollHintContainer = c}>
                    <svg onClick={this.handleHintClick} ref={(c) => this._scrollHint = c} width="70" height="70" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle id="bar" ref={(c) => this._scrollHintBar = c} r="32" cx="34" cy="34" fill="transparent" strokeDasharray="201.056" strokeDashoffset="0"></circle>
                    </svg>
                    <i onClick={this.handleHintClick} className="ncs-chevron-thin-down" ref={(c) => this._scrollArrow = c}></i>
                    <p onClick={this.handleHintClick}>{'Find out more'}</p>
                </div>

                <section className="slide slide-1v" ref={(c) => this._section1 = c}></section>
                <section className="slide slide-2v" ref={(c) => this._section2 = c}></section>
                <section className="slide slide-3v" ref={(c) => this._section3 = c}></section>
                <section className="slide slide-4v" ref={(c) => this._section4 = c}></section>
            </article>
        );
    }
}

Home.propTypes = {
    strings: PropTypes.object.isRequired,
};

Home.defaultProps = {
    strings: {
        welcome: 'WELCOME MESSAGE',
    },
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getAnimationUtils(component, controller, timeLines, scenes) {

    var ret = {};

    ret.hideLeft = function (elems) {
        for (var i = 0; i < elems.length; i++) {
            timeLines.push(TweenMax.set(elems[i], { x: '-100%', ease: Linear.easeNone }));
        }
    };
    ret.hideRight = function (elems) {
        for (var i = 0; i < elems.length; i++) {
            timeLines.push(TweenMax.set(elems[i], { x: '+100%', ease: Linear.easeNone }));
        }
    };
    ret.updateGradientBackground = function (gr) {
        //console.log('update grad',gr.color0 , gr.color1 );
        timeLines.push(TweenMax.set('article.page-home > .gradient', { background: 'linear-gradient(45deg, ' + gr.color0 + ' 0%, ' + gr.color1 + ' 100%)' }));
    };
    ret.animateGradientColors = function (fromGrad, toGrad) {
        //console.log('animateGradientColors  ',fromGrad, toGrad);
        var anim = TweenMax.to(fromGrad, 1, { colorProps: toGrad, ease: Linear.easeNone, onUpdate: ret.updateGradientBackground, onUpdateParams: [fromGrad] });
        timeLines.push(anim);
        return anim;
    };
    ret.pinSections = function (sections, breakpoint) {
        for (var i = 0; i < sections.length; i++) {
            scenes[breakpoint].push(new ScrollMagic.Scene({ triggerElement: sections[i], triggerHook: 'onLeave' }).setPin(sections[i]).addTo(controller));
        }
    };
    ret.moveLeft = function (elem) {
        // var t = TweenMax.to(elem, 0.6, { x: '-100%', ease: Power4.easeIn });
        var t = TweenMax.to(elem, 0.6, { x: '-100%' });
        timeLines.push(t);
        return t;
    };
    ret.moveRight = function (elem) {
        //var t = TweenMax.to(elem, 0.6, { x: '+100%', ease: Power4.easeIn });
        var t = TweenMax.to(elem, 0.6, { x: '+100%' });
        timeLines.push(t);
        return t;
    };
    ret.moveToInitial = function (elem) {
        var t = TweenMax.to(elem, 0.8, { x: '0%' });
        timeLines.push(t);
        return t;
    };
    ret.moveToInitialInstant = function (elem) {
        var t = TweenMax.set(elem, { x: '0%' });
        timeLines.push(t);
        return t;
    };
    ret.hideImg = function (elem) {
        var t = TweenMax.to(elem, 0.8, { opacity: 0 });
        timeLines.push(t);
        return t;
    };
    ret.hideImgInstant = function (elem) {
        var t = TweenMax.set(elem, { opacity: 0 });
        timeLines.push(t);
        return t;
    };
    ret.showImgInstant = function (elem) {
        var t = TweenMax.set(elem, { opacity: 1 });
        timeLines.push(t);
        return t;
    };
    ret.showImg = function (elem) {
        var t = TweenMax.to(elem, 0.8, { opacity: 1 });
        timeLines.push(t);
        return t;
    };
    ret.hideSlide = function (elem) {
        var t = TweenMax.to(elem, 0.1, { display: 'none' });
        timeLines.push(t);
        return t;
    };
    ret.showSlide = function (elem) {
        var t = TweenMax.to(elem, 0.1, { display: 'block' });
        timeLines.push(t);
        return t;
    };
    ret.animateGradients = function (mediaBreakpoint, sections, gradients) {
        var slide1GrTr = this.animateGradientColors({ color0: gradients[0], color1: gradients[1] }, { color0: gradients[1], color1: gradients[2] });
        var slide2GrTr = this.animateGradientColors({ color0: gradients[1], color1: gradients[2] }, { color0: gradients[2], color1: gradients[3] });
        var slide3GrTr = this.animateGradientColors({ color0: gradients[2], color1: gradients[3] }, { color0: gradients[3], color1: gradients[4] });

        scenes[mediaBreakpoint].push(new ScrollMagic.Scene({ triggerElement: sections[0], triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide1GrTr));
        scenes[mediaBreakpoint].push(new ScrollMagic.Scene({ triggerElement: sections[1], triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide2GrTr));
        scenes[mediaBreakpoint].push(new ScrollMagic.Scene({ triggerElement: sections[2], triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide3GrTr));
    };
    ret.setHintProgressInstant = function (hintBar, scrollHint) {
        if (!hintBar || !hintBar.attr) return;
        let val = scrollHint.val;
        if (isNaN(val)) {
            val = 100;
        }
        else {
            var r = hintBar.attr('r');
            var c = Math.PI * (r * 2);

            if (val < 0) { val = 0; }
            if (val > 100) { val = 100; }

            var pct = ((100 - val) / 100) * c;

            hintBar.css({ strokeDashoffset: pct });
        }
    };
    ret.setHintProgress = function (hintBar, fromVal, toVal) {
        let scrollHint = { val: fromVal };
        var t = TweenMax.to(scrollHint, 1, { val: toVal, onUpdate: ret.setHintProgressInstant.bind(this, hintBar, scrollHint) });
        timeLines.push(t);
        window.setHintProgressInstant = ret.setHintProgressInstant.bind(this, hintBar);
        return t;
    };
    return ret;
}


export default Home;
