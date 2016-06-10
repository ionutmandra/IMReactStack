import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';

class PortfolioDetails extends Component {

    constructor(props) {
        super(props);
        this.handleCallToActionClick = this.handleCallToActionClick.bind(this);
    }
    handleCallToActionClick(event) {
          this.props.transition({
              type: 'content',
              column: 6,
              target: event.target,
          });        
    }
    render() {
        return (
            <article className="page page-portfolio-details">
                <Header title={'Safetybank is an enterprise class application with multiple platforms support'} />
                <section className="content">
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h1>Safetybank is an online health and safety information system</h1>
                            <div className="project-description">
                                It revolutionizes the built environment in UK and worldwide.
                            </div>
                        </div>
                        <div className="large-9 columns">
                            <img src="/client/dist/img/photos/safetylogo.png" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-3 large-offset-3 columns project-awards">                            
                                <img src="/client/dist/img/photos/awards.png" />
                                <img src="/client/dist/img/photos/awards.png" />                            
                        </div>
                        <div className="large-3 columns  project-awards">                            
                                <img src="/client/dist/img/photos/awards.png" />
                                <img src="/client/dist/img/photos/awards.png" />                            
                        </div>
                        <div className="large-3 columns  project-awards">                            
                                <img src="/client/dist/img/photos/awards.png" />
                                <img src="/client/dist/img/photos/awards.png" />                            
                        </div>
                        <div className="large-9 columns">
                            <h2>Safetybank is an award winning application in the last couple of years.</h2>
                            Most innovative application in housing industry 2016 
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-12 large-offset-6 columns">
                            <h1>Serving thousands of companies</h1>
                            Hosted on Azure Cloud on a top cluster configuration offers the functionality that a 21st century building company needs to safely manage its projects.
                        </div>
                    </div>
                    <div className="spacer-40" />
                    <div className="row align-middle">
                        <div className="large-12 large-offset-6 columns">
                         <ul>
                            <li>Custom data collection and reporting via built-in dynamic forms</li>
                            <li>Extensive reporting and notiﬁcation services</li>
                            <li>Signature capture, Geolocation support, Image processing</li>
                        </ul>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                 <section className="call-to-action row align-middle">
                    <div className="image large-9 columns">
                        <img src="/client/dist/img/photos/temp3.jpg" />
                    </div>
                    <div className="large-8 large-offset-3 columns">
                        <p>Everything changes but our passion.</p>
                        <p className="cta">Want to meet us? <Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}>Let's talk</Link></p>
                    </div>
                </section>
                <Footer />
            </article>
        );
    }
}

PortfolioDetails.propTypes = {
    strings: PropTypes.object.isRequired,
};

PortfolioDetails.defaultProps = {
    strings: {
    },
};

export default PortfolioDetails;