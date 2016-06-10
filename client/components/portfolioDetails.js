import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';

class PortfolioDetails extends Component {
    render() {
        return (
            <article className="page page-portfolio-details">
                <Header title={'Scurt text despre Adaptabi ca si companie: cine sunt, ce fac si care este misiunea lor'} />
                <section className="content">
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h1>Safetybank</h1>
                            <div className="project-description">
                                Scurt text despre ce inseamna Safetybank pentru Adaptabi.Nunc sit amet tincidunt odio.Praesent quis posuere magna, quis mollis libero
                            </div>
                        </div>
                        <div className="large-9 columns">
                            <img src="/client/dist/img/photos/prjSfb.png" />
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
                            The text needs revision.It has to be ﬂowy and to present ideas in a ore logical order.Custom data collection and reporting via built-in dynamic forms.
                            Signature capture, Geolocation support, Image processing.
                        </div>
                    </div>
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h2>Custom data collection and reporting via built-in dynamic forms</h2>
                        </div>
                        <div className="large-9 columns">
                            <img src="/client/dist/img/photos/customData.png" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <img src="/client/dist/img/photos/indicators.png" />
                        </div>
                        <div className="large-9 columns">
                            <h2>Extensive reporting and notiﬁcation services</h2>
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h2>Signature capture, Geolocation support, Image processing</h2>
                        </div>
                        <div className="large-9 columns">
                            <img src="/client/dist/img/photos/signatures.png" />
                        </div>
                    </div>
                </section>
                 <section className="call-to-action row align-middle">
                    <div className="image large-9 columns">
                        <img src="/client/dist/img/photos/temp3.jpg" />
                    </div>
                    <div className="large-8 large-offset-3 columns">
                        <p>Everything changes but our passion.</p>
                        <p className="cta">Want to meet us? <Link to={routePaths.client.careers}>Let's talk</Link></p>
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