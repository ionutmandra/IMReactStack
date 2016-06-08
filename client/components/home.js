import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {

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
            var t = TweenMax.to(window, 0.7, { scrollTo: { y: newpos }, ease: Power3.easeOut })
            timeLines.push(t);
            return t;
        });

        var t = new TimelineMax();
        t.add([moveLeft(this._inputCreate), moveRight(this._inputSoftware)]);
        t.add([
            moveToInitial(_this._inputGrow),
            moveToInitial(_this._inputValuesLeft),
            moveToInitial(_this._inputValuesRight)]);

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '80%', offset: 150 })
            .addTo(controller)
            //.addIndicators({name:'1'})
            .setTween(t));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '10%', offset: 150 })
            .addTo(controller)
            //.addIndicators({name:'2'})
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section2);
                }
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(_this._section1);
                }
            }));

        //section2
        var section2 = new TimelineMax();
        section2.add([
            moveLeft(_this._inputGrow),
            moveRight(_this._inputValuesLeft),
            moveLeft(_this._inputValuesRight)
        ]);
        section2.set({}, {}, .4);
        section2.add([
            moveToInitial(_this._inputCreating),
            moveToInitial(_this._inputOffering),
        ]);

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, duration: '80%' })
            .addTo(controller)
            .setTween(section2));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '10%', offset: 150 }).addTo(controller)
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section3);
                }
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(_this._section2);
                }
            }));

        //section3
        var section3 = new TimelineMax();
        section3.add([
            moveLeft(_this._inputCreating),
            moveRight(_this._inputOffering),
        ]);
        section3.set({}, {}, .4);
        section3.add([
            moveToInitial(_this._inputSustaining),
        ]);

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, duration: "80%" })
            .addTo(controller)
            .setTween(section3));

        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '10%', offset: 150 }).addTo(controller)
            .on("end", function (event) {
                if (event.scrollDirection == 'FORWARD') {
                    controller.scrollTo(_this._section4);
                }
                if (event.scrollDirection == 'REVERSE') {
                    controller.scrollTo(_this._section3);
                }
            }));
    }

    render() {
        //const s = this.props.strings;
        return (
            <article className="page-home">
                <section className="slide slide-1 background" ref={(c) => this._section1b = c}>
                    <div><img src="client/assets/img/photos/temp1.jpg" /></div>
                </section>
                <section className="slide slide-2 background" ref={(c) => this._section2b = c}>
                    <div><img src="client/assets/img/photos/temp2.jpg" /></div>
                </section>
                <section className="slide slide-3 background" ref={(c) => this._section3b = c}>
                    <div><img src="client/assets/img/photos/temp3.jpg" /></div>
                </section>
                <section className="slide slide-4 background" ref={(c) => this._section4b = c}>
                    <div><img src="client/assets/img/photos/temp4.jpg" /></div>
                </section>

                <div className="gradient" />

                <section className="slide slide-1 content"  ref={(c) => this._section1c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSoftware = c}>{'Software Innovators Happily Together'}</h1></div>
                    <div className="text-2"><h2 ref={(c) => this._inputCreate = c}>{'Create a truly remarkable working environment and deliver high quality innovative software products and services'}</h2></div>
                    <div className="scroll-hint"><p>{'Find out more'}</p></div>
                </section>

                <section className="slide slide-2 content"  ref={(c) => this._section2c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputGrow = c}>Grow an outstanding working environment driven by our culture</h1></div>
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
                    <div className="text-1"><h1 ref={(c) => this._inputOffering = c}>Offering highest quality by constantly improving our skills and processes</h1></div>
                    <div className="text-2"><h1 ref={(c) => this._inputCreating = c}>Creating high impact software solutions that help business succeed</h1></div>
                </section>

                <section className="slide slide-4 content"  ref={(c) => this._section4c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSustaining = c}>Sustaining learning and innovation as a part of our routine </h1></div>
                </section>

                <section className="slide slide-1v" ref={(c) => this._section1 = c}></section>
                <section className="slide slide-2v" ref={(c) => this._section2 = c}></section>
                <section className="slide slide-3v"   ref={(c) => this._section3 = c}></section>
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
