import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import {Link} from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(event) {
        this.props.transition({
            type: 'header',
            column: event.target.getAttribute('data-animate-line'),
            target: event.target,
        });
    }

    componentWillUnmount() {

        for (var i = 0; i < this.scenes.length; i++) {
            this.scenes[i].destroy();
            this.scenes[i] = null;
        }

        for (var i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }

        this.controller.destroy();
        this.controller = null;
    }

    componentDidMount() {

        var gradients = ['#d6cb26', '#68bc45', '#1895a3', '#4f2063', '#c80786', '#ed2f2e'];
        var _this = this;
        var controller = new ScrollMagic.Controller();
        this.controller = controller;
        var timeLines = this.timeLines = [];
        var scenes = this.scenes = [];

        TweenPlugin.activate(["colorProps"]);

        function hideLeft(elems) {
            for (var i = 0; i < elems.length; i++) {
                timeLines.push(TweenMax.set(elems[i], { x: '-100%', ease: Linear.easeNone }));
            }
        }
        function hideRight(elems) {
            for (var i = 0; i < elems.length; i++) {
                timeLines.push(TweenMax.set(elems[i], { x: '+100%', ease: Linear.easeNone }));
            }
        }
        function updateGradientBackground(gr) {
            timeLines.push(TweenLite.set('article.page-home > .gradient', { background: "linear-gradient(45deg, " + gr.color0 + " 0%, " + gr.color1 + " 100%)" }));
        }
        function animateGradientColors(fromGrad, toGrad) {
            var anim = TweenMax.to(fromGrad, 1, { colorProps: toGrad, ease: Linear.easeNone, onUpdate: updateGradientBackground, onUpdateParams: [fromGrad] });
            timeLines.push(anim);
            return anim;
        }
        function pinSections(sections) {
            for (var i = 0; i < sections.length; i++) {
                scenes.push(new ScrollMagic.Scene({ triggerElement: sections[i], triggerHook: 'onLeave', }).setPin(sections[i]).addTo(controller));
            }
        }
        function moveLeft(elem) {
            // var t = TweenMax.to(elem, 0.6, { x: '-100%', ease: Power4.easeIn });
            var t = TweenMax.to(elem, 0.6, { x: '-100%' });
            timeLines.push(t);
            return t;
        }
        function moveRight(elem) {
            //var t = TweenMax.to(elem, 0.6, { x: '+100%', ease: Power4.easeIn });
            var t = TweenMax.to(elem, 0.6, { x: '+100%' });
            timeLines.push(t);
            return t;
        }
        function moveToInitial(elem) {
            var t = TweenMax.to(elem, 0.8, { x: '0%' });
            timeLines.push(t);
            return t;
        }
        function hideImg(elem) {
            var t = TweenMax.to(elem, 0.8, { opacity: 0 });
            timeLines.push(t);
            return t;
        }
        function showImg(elem) {
            var t = TweenMax.to(elem, 0.8, { opacity: 1 });
            timeLines.push(t);
            return t;
        }
        function hideSlide(elem) {
            var t = TweenMax.to(elem, 0.1, { display: 'none' });
            timeLines.push(t);
            return t;
        }
        function showSlide(elem) {
            var t = TweenMax.to(elem, 0.1, { display: 'block' });
            timeLines.push(t);
            return t;
        }


        hideSlide(this._section2c);
        hideSlide(this._section3c);
        hideSlide(this._section4c);


        hideImg(_this._img2);
        hideImg(_this._img3);
        hideImg(_this._img4);

        hideLeft([this._inputGrow, this._inputValuesRight, this._inputCreating, this._inputSustaining]);
        hideRight([this._inputValuesLeft, this._inputOffering]);

        pinSections([this._section1, this._section2, this._section3, this._section4]);
        pinSections([this._section1b, this._section2b, this._section3b, this._section4b]);
        pinSections([this._section1c, this._section2c, this._section3c, this._section4c]);

        //gradient animations
        var slide1GrTr = animateGradientColors({ color0: gradients[0], color1: gradients[1] }, { color0: gradients[1], color1: gradients[2] });
        var slide2GrTr = animateGradientColors({ color0: gradients[1], color1: gradients[2] }, { color0: gradients[2], color1: gradients[3] });
        var slide3GrTr = animateGradientColors({ color0: gradients[2], color1: gradients[3] }, { color0: gradients[3], color1: gradients[4] });

        //scenes
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide1GrTr));
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide2GrTr));
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide3GrTr));

        // change behaviour of controller to animate scroll instead of jump
        controller.scrollTo(function (newpos) {
            var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } })
            timeLines.push(t);
            return t;
        });

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 10 })
            //.addIndicators({name:'0'})
            .addTo(controller)
            .setTween(
            new TimelineMax()
                .add(TweenMax.to(this._scrollHint, 0.3, {transformOrigin: "50% 50%",y: '+10',ease: Circ.easeOut}))
                .add(TweenMax.to(this._scrollHint, 0.3, {transformOrigin: "50% 50%",y: '0',ease: Circ.easeIn}))
        ));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '80%', offset: 150 })
            .addTo(controller)
            //.addIndicators({name:'1'})
            .on("end", function (event) {
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(this);
                }
            })
            .setTween(
            new TimelineMax()
                .add([moveLeft(this._inputCreate), moveRight(this._inputSoftware), hideImg(this._img1)])
                .add(hideSlide(this._section1c))
                .add(showSlide(this._section2c))
                .add([
                    moveToInitial(_this._inputGrow),
                    moveToInitial(_this._inputValuesLeft),
                    moveToInitial(_this._inputValuesRight),
                    showImg(this._img2)])

            ));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '5%', offset: 130 })
            .addTo(controller)
            //.addIndicators({name:'2'})
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section2);
                }
            }));

        //section2
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, duration: '80%' })
            .addTo(controller)
            //.addIndicators({name:'2oe'})
            .setTween(new TimelineMax()
                .add([
                    moveLeft(_this._inputGrow),
                    moveRight(_this._inputValuesLeft),
                    moveLeft(_this._inputValuesRight)
                ])
                .add(hideSlide(this._section2c))
                .add(showSlide(this._section3c))
                .set({}, {}, .4)
                .add([
                    moveToInitial(_this._inputCreating),
                    moveToInitial(_this._inputOffering),
                ])
                .add(hideImg(this._img2))
                .add(showImg(this._img3))
            )
            .on("end", function (event) {
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(this);
                }
            }));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '6%', offset: 130 }).addTo(controller)
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section3);
                }
            }));

        //section3
        var section3 = new TimelineMax();
        section3.add([
            moveLeft(_this._inputCreating),
            moveRight(_this._inputOffering),
        ]);
        section3.add(hideSlide(this._section3c))
        section3.add(showSlide(this._section4c))
        section3.set({}, {}, .4);
        section3.add([
            moveToInitial(_this._inputSustaining),
        ]);
        section3.add(hideImg(this._img3));
        section3.add(showImg(this._img4));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, duration: "80%" })
            .addTo(controller)
            //.addIndicators({name:'3oe'})
            .setTween(section3)
            .on("end", function (event) {
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(this);
                }
            }));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '5%', offset: 150 }).addTo(controller)
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section4);
                }
            }));
    }

    render() {
        //const s = this.props.strings;
        return (
            <article className="page-home">
                <Header linksOnly={true} />

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

                <div className="gradient" />

                <section className="slide slide-1 content"  ref={(c) => this._section1c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSoftware = c}>{'Software Innovators Happily Together'}</h1></div>
                    <div className="text-2">
                        <h2 ref={(c) => this._inputCreate = c}>
                            <p>Create a truly remarkable working environment</p>
                            <p>and deliver high quality, innovative software</p>
                            <p>products and services</p>
                        </h2>
                    </div>

                     <div className="text-3">
                        <div className="text-content">
                            Everything changes but our passion.
                        </div>
                    </div>

                    <div className="scroll-hint">
                        <span ref={(c) => this._scrollHint = c}>
                            <i className="ncs-chevron-thin-down"></i>
                        </span>
                        <p>{'Find out more'}</p>
                    </div>
                </section>

                <section className="slide slide-2 content"  ref={(c) => this._section2c = c}>
                    <div className="text-1">
                        <h1 ref={(c) => this._inputGrow = c}>
                            <p>Grow an outstanding</p>
                            <p>working environment driven</p>
                            <p>by <Link to="/about" data-animate-line="3" onClick={this.handleLinkClick}>our culture</Link></p>
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
                    <div className="text-1"><h1 ref={(c) => this._inputOffering = c}>Offering highest quality by constantly improving our <Link to="/about" data-animate-line="3" onClick={this.handleLinkClick}>skills and processes</Link></h1></div>
                    <div className="text-2"><h1 ref={(c) => this._inputCreating = c}>Creating <Link to="/portfolio/sfb" data-animate-line="5" onClick={this.handleLinkClick}>high impact software solutions</Link> that help business succeed
                    </h1></div>
                </section>

                <section className="slide slide-4 content"  ref={(c) => this._section4c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSustaining = c}>Sustaining <Link to="/about" data-animate-line="3" onClick={this.handleLinkClick}>learning and innovation</Link> as a part day to day activity.</h1></div>
                </section>

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

export default Home;

function tests() {
    // //section1
    // var section1 = new TimelineMax();
    // section1.add([
    //     moveRight(_this._inputSoftware),
    //     moveLeft(_this._inputCreate)]);
    // section1.set({}, {}, .4);
    // section1.add([
    //     moveToInitial(_this._inputGrow),
    //     moveToInitial(_this._inputValuesLeft),
    //     moveToInitial(_this._inputValuesRight),]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 250 })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section2); } })
    //     .setTween(section1));

    // //section2
    // var section2 = new TimelineMax();
    // section2.add([
    //     moveLeft(_this._inputGrow),
    //     moveRight(_this._inputValuesLeft),
    //     moveLeft(_this._inputValuesRight)
    // ]);
    // section2.set({}, {}, .4);
    // section2.add([
    //     moveToInitial(_this._inputCreating),
    //     moveToInitial(_this._inputOffering),
    // ]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section3); } })
    //     .setTween(section2));

    // //section3
    // var section3 = new TimelineMax();
    // section3.add([
    //     moveLeft(_this._inputCreating),
    //     moveRight(_this._inputOffering),
    // ]);
    // section3.set({}, {}, .4);
    // section3.add([
    //     moveToInitial(_this._inputSustaining),
    // ]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section4); } })
    //     .setTween(section3));
}
