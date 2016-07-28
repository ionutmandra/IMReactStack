import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class About extends Component {
    constructor(props) {
        super(props);
        //this.handleSafetybankProjectClick = this.handleSafetybankProjectClick.bind(this);
    }

    //   handleSafetybankProjectClick(event) {
    //     this.props.dispatchTransition({
    //       type: 'content',
    //       column: 5,
    //       target: event.target,
    //     });
    //   }

    componentDidMount() {
        document.title = 'Adaptabi - Team and culture';
    }

    render() {
        //console.log('render about js');
        var divStyle = { display: 'none' };
        var inlineBock = { display: 'inline-block' };
        return (
            <article className="page page-about">
                <Header ref={'header'} title={'We deliver high quality software by sustaining learning and innovation'} highlightAbout/>
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">We are crafting web and mobile software applications</h1>
                            <div className="spacer-40 medium-0 small-24 hide-for-medium-only hide-for-small-only"></div>
                            <div className="text-under-header content-item">
                                <p>The story begins in 2007 when two friends who loved <b>good code</b> and had <b>big dreams</b> decided to start a software company.</p>
                                <p>As time passed the team grew up and with help from a good partner in the UK, we started working on a <b>startup project</b>.</p>
                                <p>The project got from a simple app to an enterprise class application recognized with the most <b>prestigious awards</b> in the industry.</p>
                                <p>Our journey continues with a growing family being ready to take on challenges because the <b>learning and innovation</b> process never stops.</p>
                            </div>
                        </div>
                        <div className="spacer-40 medium-0 small-24 hide-for-large"/>
                        <div className="image large-9 large-offset-1 medium-11 medium-offset-2 small-24 small-offset-0 columns">
                            <img src="/client/dist/img/photos/color/3.jpg" className="content-item" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="our-culture">
                        <div className="row">
                            <span className="large-16 large-offset-3 medium-5 medium-offset-1 small-22 small-offset-1 columns"><h2 id="ourculture" className="content-item">Our culture</h2></span>
                        </div>
                        <div className="spacer-40" />
                        <div className="row align-middle">
                            <div className="image light show-for-medium-up large-6 large-offset-6 show-for-large columns"><img src="/client/dist/img/photos/color/4.jpg" className="content-item"/></div>
                            <p className="large-5 large-pull-9 large-offset-0 medium-9 medium-offset-1 small-22 small-offset-1 columns"><span className="content-item block">We believe in <strong>happiness</strong> by enjoying what we do and doing what really matters.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                            <p className="large-5 large-pull-2 large-offset-0 medium-9 medium-offset-2 small-22 small-offset-1 columns"><span className="content-item block">We believe in energizing ourselves by following our <strong>passion</strong>.</span></p>
                            <div className="spacer-40 medium-0 small-24  show-for-small-only"/>
                        </div>
                        <div className="spacer-60 show-for-medium-only" />
                        <div className="row align-middle">
                            <p className="large-5 large-offset-6 medium-9 medium-offset-1 small-22 small-offset-1 columns"><span className="content-item block">We believe <strong>trust</strong> in each other will allow us to be more autonomous and responsible.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                            <div className="image light large-6 large-push-7 show-for-large columns"><img src="/client/dist/img/photos/color/5.jpg" className="content-item block" /></div>
                            <p className="large-5 large-pull-2 large-offset-0 medium-9 medium-offset-2 small-22 small-offset-1 columns"><span className="content-item block">We believe there should be a clear <strong>purpose</strong> in everything we do.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                        </div>
                        <div className="spacer-60 show-for-medium-only" />
                        <div className="row align-middle">
                            <div className="image light large-6 show-for-large columns"><img src="/client/dist/img/photos/color/6.jpg" className="content-item" /></div>
                            <p className="large-5 large-pull-3 large-offset-0 medium-9 medium-offset-1 small-22 small-offset-1 columns"><span className="content-item block">We believe in delivering high quality by continuous learning and <strong>professionalism</strong>.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                            <p className="large-5 large-offset-1 medium-10 medium-offset-2 small-22 small-offset-1 columns"><span className="content-item block">We believe openness and transparency always leads to meaningful, kind <strong>communication</strong>.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                        </div>
                        <div className="spacer-60 show-for-medium-only" />
                        <div className="row align-middle">
                            <p className="large-5 large-offset-6 medium-9 small-22 small-offset-1 columns"><span className="content-item block">We believe everything changes so <strong>adaptability</strong> and <strong>innovation</strong> are essential.</span></p>
                            <div className="spacer-40 medium-0 small-24  hide-for-medium"/>
                            <div className="image light large-6 large-offset-1 small-24 small-offset-0 hide-for-medium-only columns"><img src="/client/dist/img/photos/color/7.jpg" className="content-item" /></div>
                        </div>
                    </div>
                    <div className="spacer-100"/>
                    <div className="row">
                        <span className="large-offset-3 medium-offset-1 small-offset-1 columns"><h2 className="content-item">The team</h2></span>
                    </div>
                    <div className="spacer-40 hide-for-small-only"/>
                    <div className="row">
                        <div className="large-6 large-offset-3 medium-11 medium-offset-1 small-22 small-offset-1">
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Tudor Dumitriu</p>
                                    <p className="memeber-job content-item">Co-founder and Project Manager</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Mario Theodorou</p>
                                    <p className="memeber-job content-item">Account Manager</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Mădălina Dumitriu</p>
                                    <p className="memeber-job content-item">Quality Engineer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Ionuţ Mândra</p>
                                    <p className="memeber-job content-item">Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Teodor Sandu</p>
                                    <p className="memeber-job content-item">Software Developer</p>
                                </div>
                            </div>
                        </div>
                        <div className="large-6 large-offset-0 medium-11 medium-offset-0 small-22 small-offset-1">
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Laurenţiu Macovei</p>
                                    <p className="memeber-job content-item">Co-founder and Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Marius Baciu</p>
                                    <p className="memeber-job content-item">Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Bogdan Gherman</p>
                                    <p className="memeber-job content-item">Software Developer</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="memeber-details-top columns">
                                    <p className="memeber-name content-item">Dragoş Radu</p>
                                    <p className="memeber-job content-item">Quality Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className="large-9 large-pull-3 show-for-large team-images">
                            <div className="row">
                                <div className="image show-for-medium-up light large-24 large-offset-8 columns ">
                                    <img src="/client/dist/img/photos/8.jpg" className="content-item"/>
                                </div>
                                <div className="image show-for-medium-up light large-24 columns ">
                                    <img src="/client/dist/img/photos/9.jpg" className="content-item" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <section className="call-to-action row align-middle">
                    <div className="large-9 large-order-1 medium-11 medium-order-2 small-24 columns">
                        <div className="image content-item">
                            <img src="/client/dist/img/photos/temp3.jpg" />
                            <div className="show-for-small-only small-22 small-offset-1 columns small-text-case">
                                <p>Everything changes but our passion.</p>
                                <p className="cta">
                                    <span className="hide-for-large">Interested?</span>
                                    <span className="action-links">
                                        <a href="mailto:contact@adaptabi.com?subject=Inquiry"><span>Send</span> <span>a</span> <span>message</span></a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="large-8 large-offset-3 large-order-1 medium-11 medium-offset-1 medium-order-1 small-24 show-for-medium columns">
                        <p className="content-item">Everything changes but our passion.</p>
                        <p className="cta content-item">
                            <span className="show-for-large">Want to meet us?</span>
                            <span className="hide-for-large">Interested?</span>
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

About.propTypes = {
    strings: PropTypes.object.isRequired,
};

About.defaultProps = {
    strings: {
    },
};

export default About;
