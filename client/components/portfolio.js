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

    handleProjDetailsClick(event) {
        this.props.dispatchTransition({
              type: 'content',
              column: 5,
              target: event.target,
          });
    }

    render() {
        let link = routePaths.client.portfolioDetails.replace(':key', 'sfb');

        return (
            <article className="page page-portfolio">
                <Header title={'We create high impact software solutions that help business succeed'} />
                <section className="content">
                    <div className="spacer-60"/>
                    <div className="row align-middle">
                        <div className="large-8 large-offset-3 medium-9 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">
                                <Link ref="projDetails"   to={link} onClick={this.handleProjDetailsClick}>{'Safetybank'}</Link>
                            </h1>
                            <div className="spacer-20 large-0 medium-0 small-24"/>
                            <div className="content-item">
                                <p>This is our largest project and we took it from a 50 hours concept to a <span className="no-break">50 000</span> hours enterprise class application.</p>
                                <div className="spacer-20" />
                                <p>The application was awarded "Most innovative application in housing industry" in 2016.</p>
                                <div className="spacer-20" />
                                <p>Safetybank is an online health and safety information system serving thousands of companies and hundreds of thousands of workers.</p>
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-0 small-24  show-for-small-only"/>
                        <div className="large-6 large-offset-4 medium-11 medium-offset-2 small-24 small-offset-0 columns">
                         <Link ref="projDetails" to={link} onClick={this.handleProjDetailsClick}><img src="client/dist/img/photos/safetylogo.png" className="content-item"/></Link>
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
