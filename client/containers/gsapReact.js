import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
import actions from '../actions';
import _ from 'lodash';
import {Link} from 'react-router';

class Comp4 extends Component {
	constructor(props) { super(props); }

	render() {
		return (<div id="divc4">
			<div id="div41">rrrrccc4</div>
		</div>);
	}
}



class Comp5 extends Component {
	constructor(props) { super(props); }

	componentDidMount() {

		this.controller = new ScrollMagic.Controller();

		var node = ReactDOM.findDOMNode(this);

		this.tween3 = TweenMax.to(node, 1, { opacity: 0, ease: Power2.easeIn });
		this.scene5 = new ScrollMagic.Scene({
			triggerElement: "#divc5",
			duration: 150,
			offset: 100
		})
			.setTween(this.tween3)
			.addIndicators({ name: "scene 5 " })
			.addTo(this.controller);
	}

	componentWillUnmount(){
		this.controller.destroy();
		this.scene5.destroy();
		this.tween3 = null;
		this.scene5=null;
		this.controller = null;
	}

	render() {

		return (<div id="divc5">
			<div id="div51"></div>
		</div>);
	}
}

class Gsap extends Component {
	constructor(props) {
        super(props);

	}

	componentDidMount() {
		var controller = new ScrollMagic.Controller();

		//sync animation with scroll		
		var tween2 = TweenMax.to("#div41", 1, { rotation: 360, ease: Power2.easeIn });
		var scene4 = new ScrollMagic.Scene({
			triggerElement: "#divc4",
			duration: 350
		})
			.setTween(tween2)
			//.setPin("#div41", {pushFollowers: false})
			.addIndicators({ name: "scene 4 " })
			.addTo(controller);
			
			
			//v2: 
			//var controlledElement = this.refs.refNmae.getDOMNode();
			//animate it 
	}

	render() {

		const routePaths = require('../../common/routePaths');
		var link = routePaths.client.team.members;

		return (
			<div>
				<div>
					<Link to={link}>
						members
					</Link>
				</div>
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
				<Comp4 />
				<Comp5 />
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
export default Gsap;