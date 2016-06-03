import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {

    componentDidMount() {

        var gradients = ['#d6cb26', '#68bc45', '#1895a3', '#4f2063', '#c80786', '#ed2f2e'];

        var controller = new ScrollMagic.Controller();

        TweenPlugin.activate(["colorProps"]);

        function hideLeft(elems) {
            for (var i = 0; i < elems.length; i++) {
                TweenMax.set(elems[i], { x: '-100%', ease: Linear.easeNone });
            }
        }
        function hideRight(elems) {
            for (var i = 0; i < elems.length; i++) {
                TweenMax.set(elems[i], { x: '+100%', ease: Linear.easeNone });
            }
        }
        function updateGradientBackground(gr) {
            TweenLite.set('.gradient', { background: "linear-gradient(135deg, " + gr.color0 + " 0%, " + gr.color1 + " 100%)" });
        }
        function animateGradientColors(fromGrad, toGrad) {
            return TweenMax.to(fromGrad, 1, { colorProps: toGrad, ease: Linear.easeNone, onUpdate: updateGradientBackground, onUpdateParams: [fromGrad] });
        }
        function pinSections(sections) {
            for (var i = 0; i < sections.length; i++) {
                new ScrollMagic.Scene({ triggerElement: sections[i], triggerHook: 'onLeave', }).setPin(sections[i]).addTo(controller);
            }
        }

        return;
        hideLeft([this._inputGrow, this._inputValuesRight, this._inputCreating, this._inputSustaining]);
        hideRight([this._inputValuesLeft, this._inputOffering]);
        pinSections([this._section1, this._section2, this._section3, this._section4]);
        pinSections([this._section1b, this._section2b, this._section3b, this._section4b]);

        //gradient animations
        var slide1GrTr = animateGradientColors({ color0: gradients[0], color1: gradients[1] }, { color0: gradients[1], color1: gradients[2] });
        var slide2GrTr = animateGradientColors({ color0: gradients[1], color1: gradients[2] }, { color0: gradients[2], color1: gradients[3] });
        var slide3GrTr = animateGradientColors({ color0: gradients[2], color1: gradients[3] }, { color0: gradients[3], color1: gradients[4] });

        //scenes
        new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide1GrTr);
        new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide2GrTr);
        new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide3GrTr);

        //texts
        // var scale_tween = TweenMax.to(this._inputCreate, 1, { x: '-100%', ease: Linear.easeNone, });
        // new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '20%', offset:200 }).addTo(controller).addIndicators().setTween(scale_tween);

        var scale_tween21 = TweenMax.to(this._inputGrow, 1, { x: '0%', ease: Linear.easeNone });
        new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 0.5, duration: '100%' }).addTo(controller).addIndicators().setTween(scale_tween21);


        /*                                       
                var scale_tween = TweenMax.to('.grid-block-contentr', 0.5, { x: '-100%', ease: Linear.easeNone, });
                var scale_tweenr = TweenMax.to('.grid-block-contentl', 0.5, { x: '+100%', ease: Linear.easeNone });
                var scale_tweenScroll = TweenMax.to('#scrollMore', 0.1, { opacity: 0, ease: Linear.easeNone });
                var scale_tweenr232kk = TweenMax.to('#kk', 0.5, { height: 0, ease: Linear.easeNone });
                tlm.add([grtw2, scale_tween, scale_tweenr, scale_tweenScroll]);
        
        
                var sl0 = new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', duration: '100%' })
                    .addTo(controller).setTween(tlm);
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', duration: '100%' })
                    .addTo(controller).setTween(scale_tweenr232kk);
          
        
                var scale_tween21 = TweenMax.to('#anim21', 1, { x: '0%', ease: Linear.easeNone });
                var scale_tween22 = TweenMax.to('#anim22', 1, { x: '0%', ease: Linear.easeNone });
                var scale_tweenr23 = TweenMax.to('#anim23', 1, { x: '0%', ease: Linear.easeNone });
                var tlm00 = new TimelineMax();
                tlm00.add([scale_tween21, scale_tween22, scale_tweenr23])
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', duration: '100%' })
                .addTo(controller).setTween(tlm00);
        
        
        
                //========================= 2        =================
                var tlm2 = new TimelineMax();
                var myObject = { color0: '#68bc45', color1: '#1895a3' };
                var grtw = TweenMax.to(myObject, 1, { colorProps: { color0: '#1895a3', color1: '#c80786' }, ease: Linear.easeNone, onUpdate: applyProps });
                function applyProps() {
                    TweenLite.set('.gradient', { background: "linear-gradient(135deg, " + myObject.color0 + " 0%, " + myObject.color1 + " 100%)" });
                }
                
                //tlm2.add([grtw]);
        
                var scale_tween212 = TweenMax.to('#anim21', 0.3, { x: '-100%', ease: Linear.easeNone });
                var scale_tween222 = TweenMax.to('#anim22', 0.3, { x: '100%', ease: Linear.easeNone });
                var scale_tweenr232 = TweenMax.to('#anim23', 0.3, { x: '-100%', ease: Linear.easeNone });
                
                
                var scale_tween31 = TweenMax.to('#anim31', 0.5, { x: '0%', ease: Linear.easeNone });
                var scale_tween32 = TweenMax.to('#anim32', 0.5, { x: '0%', ease: Linear.easeNone });
                
                tlm2.add([grtw,scale_tween212, scale_tween222, scale_tweenr232,scale_tween31,scale_tween32]);
        
                var sl1 = new ScrollMagic.Scene({ triggerElement: '#sectionContent2', triggerHook: 'onLeave', duration: '100%',offset:350 })
                    .setTween(tlm2).addTo(controller);
        
                var sl21 = new ScrollMagic.Scene({ triggerElement: '#sectionContent2', triggerHook: 'onLeave', })
                    .setPin('#sectionContent2').addTo(controller);
        
                var scale_tweenr2322kk = TweenMax.to('#kk2', 1, { height: 0, ease: Linear.easeNone });
                new ScrollMagic.Scene({ triggerElement: '#sectionContent2', triggerHook: 'onLeave', duration: '100%' })
                    .addTo(controller).setTween(scale_tweenr2322kk);
        
                //========================= 3        =================
        
                var tlm3 = new TimelineMax();
                var myObject3 = { color0: '#1895a3', color1: '#c80786' };
                var grtw3 = TweenMax.to(myObject3, 1, { colorProps: { color0: '#c80786', color1: '#ed2f2e' }, ease: Linear.easeNone, onUpdate: applyProps3 });
                function applyProps3() {
                    TweenLite.set('.gradient', { background: "linear-gradient(135deg, " + myObject3.color0 + " 0%, " + myObject3.color1 + " 100%)" });
                }
        
        
                var scale_tween312 = TweenMax.to('#anim31', 0.5, { x: '100%', ease: Linear.easeNone });
                var scale_tween322 = TweenMax.to('#anim32', 0.5, { x: '-100%', ease: Linear.easeNone });
                
                     var scale_tween41 = TweenMax.to('#anim41', 1, { x: '0%', ease: Linear.easeNone });
                        
                tlm3.add([grtw3,scale_tween312, scale_tween322,scale_tween41]);
        
                
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent3', triggerHook: 'onLeave', duration: '100%' })
                    .setTween(tlm3).addTo(controller);
        
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent3', triggerHook: 'onLeave' })
                    .setPin('#sectionContent3').addTo(controller);
        
                var scale_tweenr3322kk = TweenMax.to('#kk3', 1, { height: 0, ease: Linear.easeNone });
                new ScrollMagic.Scene({ triggerElement: '#sectionContent3', triggerHook: 'onLeave', duration: '100%' })
                    .addTo(controller).setTween(scale_tweenr3322kk);
        
                //========================= 4        =================
        
                var tlm4 = new TimelineMax();
                var myObject4 = { color0: '#c80786', color1: '#ed2f2e' };
                var grtw4 = TweenMax.to(myObject4, 1, { colorProps: { color0: '#1895a3', color1: '#c80786' }, ease: Linear.easeNone, onUpdate: applyProps4 });
                function applyProps4() {
                    TweenLite.set('.gradient', { background: "linear-gradient(135deg, " + myObject4.color0 + " 0%, " + myObject4.color1 + " 100%)" });
                }
        
        
        
           
                tlm4.add([grtw4]);
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent4', triggerHook: 'onLeave', duration: '100%' })
                    .setTween(tlm4).addTo(controller);
        
                new ScrollMagic.Scene({ triggerElement: '#sectionContent4', triggerHook: 'onLeave', duration: '100%' })
                    .setPin('#sectionContent4').addTo(controller);
                /**/
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

                <section className="slide slide-1 content"  ref={(c) => this._section1 = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSoftware = c}>{'Software Innovators Happily Together'}</h1></div>
                    <div className="text-2"><h2 ref={(c) => this._inputCreate = c}>{'Create a truly remarkable working environment and deliver high quality innovative software products and services'}</h2></div>
                    <div className="scroll-hint"><p>{'Find out more'}</p></div>
                </section>
                <section className="slide slide-2 content"  ref={(c) => this._section2 = c}>
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
                <section className="slide slide-3 content"  ref={(c) => this._section3 = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputOffering = c}>Offering highest quality by constantly improving our skills and processes</h1></div>
                    <div className="text-2"><h1 ref={(c) => this._inputCreating = c}>Creating high impact software solutions that help business succeed</h1></div>
                </section>
                <section className="slide slide-4 content"  ref={(c) => this._section4 = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSustaining = c}>Sustaining learning and innovation as a part of our routine </h1></div>
                </section>
                {/*<div className="section section--about is-active is-last">

                <div className="section-content" id="sectionContent1">
                    <div className="image-to-back-wrap" id='kk'>
                        <div className="image-to-back">
                            <img src="client/assets/img/photos/temp1.jpg" data-ref="background"/>
                        </div>
                    </div>

                    <div className="row content">
                        <div className="columns large-12 text-right">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-contentl" data-ref="text1">
                                        <h1>Software Innovators Happily Together</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns large-12  text-left">
                            <div className="grid-block-wrap1 delayed">
                                <div className="grid-block1">
                                    <div className="grid-block-contentr" data-ref="text2">
                                        <h2>Create a truly remarkable working environment and deliver high quality.innovative software producst and services</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="columns large-24 text-center" data-ref="textBottom">
                            <h2 id="scrollMore">Find out more</h2>
                        </div>
                    </div>

                </div>


                <div className="section-content" id="sectionContent2" >

                    <div className="image-to-back-wrap" id='kk2'>
                        <div className="image-to-back">
                            <img src="client/assets/img/photos/temp2.jpg" />
                        </div>
                    </div>

                    <div className="row content">
                        <div className="columns large-12 relative">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-content1" id="anim21">
                                        <h1>Grow an outstanding working environment driven by our culture</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns large-12 relative values">
                            <div className="columns large-12 text-right">
                                <div className="grid-block-wrap1" >
                                    <div className="grid-block1">
                                        <div className="grid-block-content1" id="anim22">
                                            <p>HAPPINESS</p>
                                            <p>TRUST</p>
                                            <p>PROFESSIONALISM</p>
                                            <p>ADAPTABILITY</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns large-12">
                                <div className="grid-block-wrap1 delayed">
                                    <div className="grid-block1">
                                        <div className="grid-block-content1" id="anim23">
                                            <p>PASSION</p>
                                            <p>PURPOSE</p>
                                            <p>COMMUNICATION</p>
                                            <p>INNOVATION</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-content" id="sectionContent3">

                    <div className="image-to-back-wrap" id='kk3'>
                        <div className="image-to-back">
                            <img src="client/assets/img/photos/temp1.jpg" />
                        </div>
                    </div>


                    <div className="row content">
                        <div className="columns large-12 relative">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-content1" id="anim31">
                                        <h1>Offering highest quality by constantly improving our skills and processes</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns large-12 relative">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-content1" id="anim32">
                                        <h1>Creating high impact software solutions that help business succeed</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-content" id="sectionContent4">

                    <div className="image-to-back-wrap" id='kk4'>
                        <div className="image-to-back">
                            <img src="client/assets/img/photos/temp2.jpg" />
                        </div>
                    </div>

                    <div className="row content">
                        <div className="columns large-12 relative"></div>
                        <div className="columns large-12 relative">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-content1" id="anim41">
                                        <h1>Sustaining learning and innovation as a part of our routine </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gradient"></div>
            </div >*/}
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
