import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import dom from 'react-dom';
import Burger from './burger';
const routePaths = require('../../common/routePaths');

class HeaderLinks extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

      componentDidMount() {

          var controller = new ScrollMagic.Controller();
          this.controller = controller;
          var timeLines = this.timeLines = [];
          var scenes = this.scenes = [];

            function moveLeft(elem) {
                var t = TweenMax.to(dom.findDOMNode(elem), 1, { x: '-110%' });
                timeLines.push(t);
                return t;
            }

          scenes.push(new ScrollMagic.Scene({ triggerHook: 'onEnter', duration: '10%', offset: 100 }).addTo(controller)
              .setTween([
                  moveLeft(this.refs.about),
                  moveLeft(this.refs.expertise),
                  moveLeft(this.refs.portofolio),
                  moveLeft(this.refs.careers),
                  moveLeft(this.refs.contact),
              ]));

      }

      handleClick(event) {
          this.props.transition({
              type: this.props.animationType || 'header',
              column: event.target.getAttribute('data-animate-line'),
              target: event.target,
          });
      }

    render() {
        return (<nav className="links">
            <ul  ref={(c) => this._linkList = c}>
                <li><Link ref="about" data-animate-line="3" onClick={this.handleClick} to={routePaths.client.about} >{'About'}</Link>                </li>
                <li><Link ref="expertise" data-animate-line="4" onClick={this.handleClick} to={routePaths.client.expertise}>{'Expertise'}</Link></li>
                <li><Link ref="portofolio" data-animate-line="5" onClick={this.handleClick} to={routePaths.client.portfolio}>{'Portfolio'}</Link></li>
                <li><Link ref="careers" data-animate-line="6" onClick={this.handleClick} to={routePaths.client.careers}>{'Careers'}</Link></li>
                <li><Link ref="contact" data-animate-line="7" onClick={this.handleClick} to={routePaths.client.contact}>{'Contact'}</Link></li>
                <li><Burger></Burger></li>
            </ul>
        </nav>);
    }
}

HeaderLinks.propTypes = {
    animationType: PropTypes.string,
    strings: PropTypes.object.isRequired,
    transition: PropTypes.func.isRequired,
};

HeaderLinks.defaultProps = {
    strings: {
    },
};

export default HeaderLinks;