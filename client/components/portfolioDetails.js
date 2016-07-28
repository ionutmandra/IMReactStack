import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class PortfolioDetails extends Component {

    constructor(props) {
        super(props);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount() {
        //   $('.grayscale-container').on('mouseenter mouseleave', function (e){
        //     console.log('mouseleave/mouseenter');
        //     $('.grayscale', this).toggleClass('hover grayscale-off');
        //     $(this).find('.post-link').toggle();
        // });

        document.title = "Adaptabi - Safetybank";

        this.$icons = $(this.refs.article).find('.row.awards .image-container')
            .on('touchstart mouseenter', this.touchStart).on('touchend mouseleave', this.touchEnd);
    }

    componentWillUnmount() {
        this.$icons.off('touchstart mouseenter', this.touchStart).off('touchend mouseleave', this.touchEnd);
    }

    touchStart(event) {
        $(event.target).addClass('hover');
    }

    touchEnd(event) {
        setTimeout(() => { $(event.target).removeClass('hover'); }, 250);
    }

    render() {
        return (
            <article className="page page-portfolio-details" ref="article">
                <Header title={'Safetybank is an enterprise class application with multiple platforms support'} />
                <section className="content">
                <div className="spacer-100"/>
                <div className="row">
                        <div className="large-7 large-offset-3 medium-9 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Safetybank is an online health and safety information system</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p>It revolutionizes the built environment in UK and worldwide.</p>
                            </div>
                            <div className="spacer-20 large-0 medium-0 small-24 hide-for-large"/>
                        </div>
                        <div className="large-9 large-offset-2  medium-11 medium-offset-2 small-24 small-offset-0 columns">
                            <img src="/client/dist/img/projects/safetybank/blog-sfb.jpg" className="content-item" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle awards">
                        <div className="large-9 large-offset-3 large-order-1 medium-22 medium-offset-1 medium-order-2 small-22 small-offset-1 small-order-2 columns project-awards">
                            <span className="image-container award3 content-item large-6 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0"></span>
                            <span className="image-container award1 content-item large-6 large-offset-2 medium-6 medium-offset-0 small-12 small-offset-0"></span>
                            <span className="image-container award4 content-item large-6 large-offset-2 medium-6 medium-offset-0 small-12 small-offset-0"></span>
                            <div className="spacer-20 large-24 show-for-large"/>
                            <span className="image-container award5 content-item large-6 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0"></span>
                            <div className="spacer-20 large-0 medium-24 show-for-medium-only"/>
                            <span className="image-container award2 content-item large-6 large-offset-2 medium-6 medium-offset-0 small-12 small-offset-0"></span>
                        </div>
                        <div className="large-7 large-offset-0 large-order-2 medium-10 medium-offset-1 medium-order-1 small-22 small-offset-1 small-order-1 columns">
                            <h2 className="content-item">Safetybank is an award winning application in the last couple of years.</h2>
                            <div className="spacer-20 large-0 medium-0 small-24 show-for-small-only"/>
                            <p><span className="content-item block">"Most innovative application" is one of the most prestigious awards in the housing industry.</span></p>
                            <div className="spacer-40 large-0 medium-24 small-24 show-for-small hide-for-large"/>
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-9 large-offset-6 medium-20 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Serving thousands of companies</h1>
                            <div className="spacer-40"/>
                            <p className="content-item block">Hosted on Azure Cloud on a top cluster configuration, it offers the functionality that a 21st century building company needs to safely manage its projects.</p>
                        </div>
                    </div>

                    <div className="spacer-40" />
                    <div className="row align-middle">
                        <div className="large-8 large-offset-3  medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <h2>Custom data collection and reporting via built-in dynamic forms</h2>
                        </div>
                        <div className="spacer-20 small-24 show-for-small-only"/>
                        <div className="large-9 large-offset-1  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                             <img src="/client/dist/img/projects/safetybank/CustomDataCollection.png" />
                        </div>
                    </div>

                    <div className="spacer-40" />
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3  large-order-1 medium-11 medium-offset-1 small-22 small-offset-1 small-order-3 columns">
                             <img src="/client/dist/img/projects/safetybank/ExtensiveReporting.png" />
                        </div>
                        <div className="large-9 large-offset-0 large-order-2  medium-10 medium-offset-1 small-22 small-offset-1 small-order-1 columns">
                            <h2>Extensive reporting and notification services</h2>
                        </div>
                        <div className="spacer-20 small-24 small-order-2 show-for-small-only"/>
                    </div>

                    <div className="spacer-40" />
                    <div className="row align-middle">
                        <div className="large-8 large-offset-3  medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <h2>Signature capture, Geolocation support, Image processing</h2>
                        </div>
                        <div className="spacer-20 small-24 show-for-small-only"/>
                        <div className="large-9 large-offset-1  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                             <img src="/client/dist/img/projects/safetybank/SignatureCapture.png" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                 <section className="call-to-action row align-middle">
                    <div className="image content-item large-9 large-order-1 medium-11 medium-order-2 columns">
                        <img src="/client/dist/img/photos/temp3.jpg" />
                         <div className="show-for-small-only small-22 small-offset-1 columns small-text-case">
                                <p>Everything changes but our passion.</p>
                                <p className="cta">
                                    <span className="hide-for-large">Interested? </span>
                                    <span className="action-links">
                                        <a href="mailto:contact@adaptabi.com?subject=Inquiry"><span>Send</span> <span>a</span> <span>message</span></a>
                                    </span>
                                 </p>
                            </div>
                    </div>
                    <div className="large-8 large-offset-3 large-order-2 medium-11 medium-offset-1 medium-order-1 show-for-medium columns">
                        <p className="content-item">Everything changes but our passion.</p>
                        <p className="cta content-item">
                            <span className="show-for-large">Want to meet us? </span>
                            <span className="hide-for-large">Interested? </span>
                            <span className="action-links">
                                <a href="mailto:contact@adaptabi.com?subject=Inquiry"><span>Send</span> <span>a</span> <span>message</span></a>
                            </span>
                        </p>
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
