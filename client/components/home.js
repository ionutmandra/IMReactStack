import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {

    componentDidMount() {
        var controller = new ScrollMagic.Controller();

        //gradient(135deg, #d6cb26 0%, #68bc45 100%);
        //gradient(135deg, #68bc45 0%, #1895a3 100%);
        //gradient(135deg, #1895a3 0%, #c80786 100%);
        //gradient(135deg, #1895a3 0%, #c80786 100%);
        //135deg, #c80786 0%, #ed2f2e 100%);

        TweenPlugin.activate(["colorProps"]);
        TweenLite.set('.gradient', { background: "linear-gradient(135deg, #d6cb26 0%, #68bc45 100%)" });

        TweenMax.set('#anim21', { x: '-100%', ease: Linear.easeNone });
        TweenMax.set('#anim22', { x: '+100%', ease: Linear.easeNone });
        TweenMax.set('#anim23', { x: '-100%', ease: Linear.easeNone });

        TweenMax.set('#anim31', { x: '+100%', ease: Linear.easeNone });
        TweenMax.set('#anim32', { x: '-100%', ease: Linear.easeNone });

        TweenMax.set('#anim41', { x: '-100%', ease: Linear.easeNone });

        var tlm = new TimelineMax();
        var myObject2 = { color0: '#d6cb26', color1: '#68bc45' };
        var grtw2 = TweenMax.to(myObject2, 1, { colorProps: { color0: '#68bc45', color1: '#1895a3' }, ease: Linear.easeNone, onUpdate: applyProps2 });
        function applyProps2() {
            TweenLite.set('.gradient', { background: "linear-gradient(135deg, " + myObject2.color0 + " 0%, " + myObject2.color1 + " 100%)" });
        }
        var scale_tween = TweenMax.to('.grid-block-contentr', 0.5, { x: '-100%', ease: Linear.easeNone, });
        var scale_tweenr = TweenMax.to('.grid-block-contentl', 0.5, { x: '+100%', ease: Linear.easeNone });
        var scale_tweenScroll = TweenMax.to('#scrollMore', 0.1, { opacity: 0, ease: Linear.easeNone });
        var scale_tweenr232kk = TweenMax.to('#kk', 0.5, { height: 0, ease: Linear.easeNone });
        tlm.add([grtw2, scale_tween, scale_tweenr, scale_tweenScroll]);


        var sl0 = new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', duration: '100%' })
            .addTo(controller).setTween(tlm);

        new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', duration: '100%' })
            .addTo(controller).setTween(scale_tweenr232kk);

        var sl01 = new ScrollMagic.Scene({ triggerElement: '#sectionContent1', triggerHook: 'onLeave', })
            .setPin('#sectionContent1').addTo(controller);


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
    }

    render() {
        const s = this.props.strings;

        return (
           	<div className="section section--about is-active is-last">
                
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
            </div >
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
