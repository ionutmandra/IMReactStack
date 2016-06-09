import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class About extends Component {
    constructor(props) {
        super(props);
        this.handleSafetybankProjectClick = this.handleSafetybankProjectClick.bind(this);
    }

    handleSafetybankProjectClick(event) {
          this.props.transition({
              type: 'content',
              column: 5,
              target: event.target,
          });        
    }

    render() {
        return (
            <article className="page page-about">
                <Header title={'We are a software development company focused on delivering high quality products and services by sustaining learning and innovation'} />
                <section className="content">
                    <div className="row align-middle">
                        <div className="large-8 large-offset-3 columns">
                            <h1>Located in Iasi, we have  been crafting web and mobile software applications since 2007</h1>
                            <p>Couple of years ago we started working on <Link to="/portfolio/sfb" onClick={this.handleSafetybankProjectClick}>Safetybank</Link> as a startup project and we took it to an enterprise class application with multiple platforms suppor</p>
                        </div>
                        <div className="image large-9 large-offset-1 columns"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <h2 className="large-16 large-offset-3 columns">Core values</h2>
                    </div>
                    <div className="row align-middle">
                        <div className="image light show-for-medium-up large-6 large-offset-6 columns"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                        <p className="large-5 large-pull-9 columns">We believe in <strong>happiness</strong> by enjoying what we do and doing what really matters.</p>
                        <p className="large-5 large-pull-2 columns">We believe in energizing ourselves by following our <strong>passion</strong>.</p>
                    </div>
                    <div className="row align-middle">
                        <p className="large-5 large-offset-6 columns">We believe there should be a clear <strong>purpose</strong> in everything we do.</p>
                        <div className="image light show-for-medium-up large-6 large-push-7 columns"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                        <p className="large-5 large-pull-2 columns">We believe <strong>trust</strong> in each other will allow us to be more autonomous and responsible.</p>
                    </div>
                    <div className="row align-middle">
                        <div className="image light show-for-medium-up large-6 columns"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                        <p className="large-5 large-pull-3 columns">We believe in delivering high quality by continuous learning and <strong>professionalism</strong>.</p>
                        <p className="large-5 large-offset-1 columns">We believe openness and transparency always leads to meaningful, kind <strong>communication</strong>.</p>
                    </div>
                    <div className="row align-middle">
                        <p className="large-5 large-offset-6 columns">We believe everything changes so <strong>adaptability</strong> and <strong>innovation</strong> are essential.</p>
                        <div className="image light large-6 large-offset-1 columns"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                    </div>
                    <div className="spacer-100"/>
                    <div className="row">
                        <h2 className="large-offset-3">The team</h2>
                    </div>               
                    <div className="spacer-40"/>     
                    <div className="row">
                        <div className="large-12 large-offset-3 memeber-details-top">
                            <div className="row">
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Tudor Dumitriu</p>
                                    <p className="memeber-job">Founder and Project Manager</p>
                                </div>
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Laurenţiu Macovei</p>
                                    <p className="memeber-job">Founder and Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-12  memeber-details-top">
                                    <p className="memeber-name">Marius Baciu</p>
                                    <p className="memeber-job">Software Developer</p>
                                </div>
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Madalina Dumitriu</p>
                                    <p className="memeber-job">Quality Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className="image show-for-medium-up light large-9 columns members-background-image"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                    </div>
                     <div className="row">
                        <div className="large-12 large-offset-3 memeber-details-group">
                            <div className="row">
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Bogdan Gherman</p>
                                    <p className="memeber-job">Software Developer</p>
                                </div>
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Ionut Mandra</p>
                                    <p className="memeber-job">Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-12  memeber-details-top">
                                    <p className="memeber-name">Dragos Radu</p>
                                    <p className="memeber-job">Quality Engineer</p>
                                </div>
                                <div className="large-12 memeber-details-top">
                                    <p className="memeber-name">Tudor Dumitriu</p>
                                    <p className="memeber-job">Software Developer</p>
                                </div>
                            </div>
                        </div>
                        <div className="image show-for-medium-up large-9 large-pull-3 light columns members-background-image"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                    </div>
                    <div className="spacer-100" />
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

About.propTypes = {
    strings: PropTypes.object.isRequired,
};

About.defaultProps = {
    strings: {
    },
};

export default About;