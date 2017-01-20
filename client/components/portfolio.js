import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.handleProjDetailsClick = this.handleProjDetailsClick.bind(this);
    }

    componentDidMount(){
      document.title = 'Adaptabi - Our projects';
    }

    handleProjDetailsClick(event) {
        this.props.dispatchTransition({
              type: 'content',
              column: 5,
              target: event.currentTarget,
          });
    }

    render() {
        let link1 = routePaths.client.portfolioDetails.replace(':key', 'sfb');
        let link2 = routePaths.client.portfolioDetails.replace(':key', 'se');

        return (
            <article className="page page-portfolio">
                <Header title={'We create high impact software solutions that help business succeed'} highlightPortfolio/>
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-9 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">
                                <Link ref="projDetails"   to={link1} onClick={this.handleProjDetailsClick}><span>Safetybank</span></Link>
                            </h1>
                            <div className="spacer-40 large-0 medium-0 small-24"/>
                            <div className="content-item">
                                <p>This is our largest project to date which we have taken from a 50 hours concept to a <span className="no-break">50,000</span> hours enterprise class application.</p>
                                <div className="spacer-20" />
                                <p>The application was awarded "Most innovative application in housing industry" in 2016.</p>
                                <div className="spacer-20" />
                                <p>Safetybank is an online health and safety information system serving thousands of companies and hundreds of thousands of workers.</p>
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-0 small-24  show-for-small-only"/>
                        <div className="large-6 large-offset-4 medium-11 medium-offset-2 small-24 small-offset-0 columns">
                         <Link ref="projDetails" to={link1} onClick={this.handleProjDetailsClick}><img src="client/dist/img/photos/safetylogo.png" className="content-item"/></Link>
                        </div>
                    </div>
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-9 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">
                                <Link ref="projDetails"   to={link2} onClick={this.handleProjDetailsClick}><span>System Essentials</span></Link>
                            </h1>
                            <div className="spacer-40 large-0 medium-0 small-24"/>
                            <div className="content-item">
                                <p>This project is your idea’s best chance to thrive out in the open. It reduces MVP delivery time, as well as development and maintenance costs. Good technology choices enable short, data-driven development cycles, effectively making you highly adaptable and responsive to market changes.</p>
                                <div className="spacer-20" />
                                <p>It is based on a tried and proven industry standard called <a href="http://alistair.cockburn.us/Hexagonal+architecture" target="_blank"><span>Hexagonal</span> <span>Architecture</span></a> (proposed by Alistair Cockburn back in 2009), and we are continuously refining and building on it.</p>
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-0 small-24  show-for-small-only"/>
                        <div className="large-6 large-offset-4 medium-11 medium-offset-2 small-24 small-offset-0 columns">
                         <Link ref="projDetails" to={link2} onClick={this.handleProjDetailsClick}><img src="client/dist/img/photos/logo-se.png" className="content-item"/></Link>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <Footer />
            </article>
        );
    }
}

Portfolio.propTypes = {
    strings: PropTypes.object.isRequired,
};

Portfolio.defaultProps = {
    strings: {
    },
};

export default Portfolio;
