import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

let $ = window.$;

class PortfolioSE extends Component {

    constructor(props) {
        super(props);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount() {
        document.title = 'Adaptabi - Safetybank';

        this.$icons = $(this.refs.article).find('.row.awards .image-container')
            .on('touchstart mouseenter', this.touchStart).on('touchend mouseleave', this.touchEnd);
    }

    componentWillUnmount() {
        this.$icons.off('touchstart mouseenter', this.touchStart).off('touchend mouseleave', this.touchEnd);
    }

    touchStart(event) {
        $(event.currentTarget).addClass('hover');
    }

    touchEnd(event) {
        setTimeout(() => { $(event.currentTarget).removeClass('hover'); }, 250);
    }

    render() {
        return (
            <article className="page page-portfolio-details" ref="article">
                <Header title={'System Essentials is your custom tailored enterprise MVP'} highlightPortfolio/>
                <section className="content">
                <div className="spacer-100"/>
                <div className="row">
                        <div className="large-7 large-offset-3 medium-9 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">System Essentials starts from a flexible hexagonal architecture implementation.</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p>The goal is to cut the initial <b>time to market</b> to the bare minimum, while ensuring that your MVP can withstand success.</p>
                                <div className="spacer-20" />
                                <p>We have built and are <b>continuously improving</b> a system implementation and a set of development practices and processes that come and evolve together to make sure that your project performs optimally in all stages of development and exploitation.</p>
                            </div>
                            <div className="spacer-20 large-0 medium-0 small-24 hide-for-large"/>
                        </div>
                        <div className="large-9 large-offset-2  medium-11 medium-offset-2 small-24 small-offset-0 columns">
                            <img src="/client/dist/img/photos/logo-se.png" className="content-item" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-9 large-offset-3 large-order-1 medium-22 medium-offset-1 medium-order-2 small-22 small-offset-1 small-order-2 columns">
                            <img src="/client/dist/img/projects/systemessentials/fig1.gif" className="content-item" />
                            <div className="caption content-item">Original <a href="http://alistair.cockburn.us/Hexagonal+architecture" target="_blank"><span>hexagonal</span> <span>architecture</span></a> concept</div>
                            <img src="/client/dist/img/projects/systemessentials/screen4.jpg" className="content-item" />
                            <div className="caption content-item">System Essentials server-side architecture concept</div>
                        </div>
                        <div className="large-7 large-offset-0 large-order-2 medium-10 medium-offset-1 medium-order-1 small-22 small-offset-1 small-order-1 columns">
                            <h1 className="content-item">Application domain scales with microservices.</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p>The application domain is where your business logic resides. The <b>fastest startup</b> is obtained by implementing initial business rules in a single app.</p>
                                <div className="spacer-20" />
                                <p>We did that, but in a way that allows for easy separation into relevant, decoupled <b>microservices</b>. Why? Because microservices enable <b>painless horizontal scalability</b> from the MVP stage.</p>
                                <div className="spacer-20" />
                                <p>This means development and validation loops can start <b>as fast as possible</b>, and you will not get into trouble if on launch your app becomes an <b>instant hit</b> with millions of users.</p>
                            </div>
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-9 large-offset-3 medium-10 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">High technology diversity brings utmost performance.</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p><b>Vertical scalability</b> means that improving or allocating more hardware resources speeds up corresponding parts of the app. If it does not, that is usually a consequence of wrong tech choices in key places.</p>
                                <div className="spacer-20" />
                                <p>Making <b>effective use</b> of different technologies across the entire system ensures utmost performance, scalability and maintanability.</p>
                            </div>
                        </div>
                        <div className="large-7 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <img src="/client/dist/img/projects/systemessentials/screen2.jpg" className="content-item" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-9 large-offset-3 large-order-1 medium-22 medium-offset-1 medium-order-2 small-22 small-offset-1 small-order-2 columns">
                            <img src="/client/dist/img/projects/systemessentials/screen1.jpg" className="content-item" />
                        </div>
                        <div className="large-7 large-offset-0 large-order-2 medium-10 medium-offset-1 medium-order-1 small-22 small-offset-1 small-order-1 columns">
                            <h1 className="content-item">Looking and feeling great is vital. We've got this.</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p>Users today are enjoying a plethora of really good looking websites and apps. User interfaces have evolved a great deal and have been proven <b>increasingly vital</b> to project success. Expectations are high, and competition is fierce.</p>
                                <div className="spacer-20" />
                                <p>System Essentials' UI is based on a very <b>responsive and versatile</b> technology stack. It makes good use of Facebook's <a href="https://facebook.github.io/react/" target="_blank"><span>React</span></a> and Google's <a href="https://material.io/" target="_blank"><span>Material</span> <span>Design</span></a>, without being tightly coupled.</p>
                                <div className="spacer-20" />
                                <p>Collaboration with dedicated designer companies ensures coherent and appealing graphics. Our years of technical expertise result in clean, <b>smooth experiences</b> that end-users will simply love.</p>
                            </div>
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-9 large-offset-3 medium-10 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Test coverage brings peace of mind. Build automation brings development speed.</h1>
                            <div className="spacer-40 small-24"/>
                            <div className="project-description content-item">
                                <p>Unit and integration tests coverage means that changes in functionality go live in a sensible, <b>predictable manner</b>. Using the right tool for each job results in quick and reliable testing runs and easy tests maintenance.</p>
                                <div className="spacer-20" />
                                <p>Automated build processes bring fast delivery times. On mobile devices, special deployment techniques like "Hot Code Push" get your <b>features in production instantly</b> once they are done, effectively bypassing weeks of store review delays.</p>
                            </div>
                        </div>
                        <div className="large-7 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <img src="/client/dist/img/projects/systemessentials/screen3.jpg" className="content-item" />
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

PortfolioSE.propTypes = {
    strings: PropTypes.object.isRequired,
};

PortfolioSE.defaultProps = {
    strings: {
    },
};

export default PortfolioSE;
