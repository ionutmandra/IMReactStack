import React, { PropTypes, Component } from 'react';
import actions from '../actions';
import _ from 'lodash';
import {Link} from 'react-router';


class Gsap extends Component {
	constructor(props) {
        super(props);

	}

	componentDidMount() {
		var controller = new ScrollMagic.Controller();
		
		var tween1 = TweenMax.to("#div4", 1, { rotation: 360, ease: Linear.easeNone });
		
		var scene = new ScrollMagic.Scene({
			triggerElement: '#divc3', 			
			offset: 1,
			triggerHook:'onLeave'
		})			
		.addTo(controller)			
		.addIndicators({name: "scene 1 "})
		.setTween(tween1);
					
		var tween = TweenMax.to(".div14", 0.5, { 'margin-left': -50,  ease:SlowMo.ease.config(0.7, 0.7, false) });
		
		var scene = new ScrollMagic.Scene({
			triggerElement: '#divc2', 			
			offset: 1})			
			.addIndicators({name: "scene 2 "})
			.addTo(controller)
			.setTween(tween);			
			
		var scene3 = new ScrollMagic.Scene({
			triggerElement: '#divc2',
			duration:200})			
			.addIndicators({name: "scene 3 "})
			.addTo(controller)			
			.setPin("#pin1");
		
		//sync animation with scroll		
		var tween2 = TweenMax.to("#div41", 1, {rotation: 360, ease: Power2.easeIn});							
		var scene4 = new ScrollMagic.Scene({
			triggerElement: "#divc4", 
			duration: 350
		})
			.setTween(tween2)
			//.setPin("#div41", {pushFollowers: false})
			.addIndicators({name: "scene 4 "}) 
			.addTo(controller);
			
		var tween3 = TweenMax.to("#div51", 1, {opacity: 0, ease: Power2.easeIn});							
		var scene5 = new ScrollMagic.Scene({
			triggerElement: "#divc5", 
			duration: 150,
			offset:100
		})
			.setTween(tween3)			
			.addIndicators({name: "scene 5 "}) 
			.addTo(controller);
							
	}

	render() {
		return (
			<div>
				<div id="divc1" className="div-ctainer1">
					<div id="div12" className="div12"></div>
					<div className="div13">
					<div className="div14">hhh</div>
						<p>nkfdasndkas</p>
						<p>nkfdasndkas</p>
						<p>nkfdasndkas</p>
						<p>nkfdasndkas</p>
						<p>nkfdasndkas</p>
						<div id="pin1">I am a stinky</div>
					</div>					
				</div>
				<div id="divc2" className="div-ctainer2"></div>
				<div id="divc3" className="div-ctainer3">
					<div id="div4" className="div-ctainer4"></div>
				</div>
				<div id="divc4">
					<div id="div41"></div>
				</div>
				<div id="divc5">
					<div id="div51"></div>
				</div>
				<div id="divc6">
					<div id="div61"></div>
				</div>
				<div className="tr1">
						<div  className="tr2">
							<div  className="tr3">trigger</div>
						</div>
				</div>				
			</div>);
	}
}

Gsap.propTypes = {

};

Gsap.defaultProps = {

};


export default Gsap;