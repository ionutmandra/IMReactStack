import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import routePaths from '../../common/routePaths';
import { Link } from 'react-router';

let $ = window.$;

class NeedHelpPage extends Component {
    constructor(props) {
        super(props);
        this.handleContentLinkClick = this.handleContentLinkClick.bind(this);
        this.handleContactClick = this.handleContactClick.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount() {
        document.title = 'Adaptabi - Need help with a project?';
        this.$icons = $(this.refs.article).find('.grayscale-container img, .processes i')
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

    handleContentLinkClick(event) {
        this.props.dispatchTransition({
            type: 'header',
            column: 4,
            target: event.currentTarget,
        });
    }

    handleContactClick(event) {
        this.props.dispatchTransition({
            type: 'content',
            column: 7,
            target: event.currentTarget,
        });
    }

    render() {
        return (
            <article className="page page-need-help" ref="article">
                <Header ref={'header'} title={'Need help with a project? You have come to the right place!'} />
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">About us</h1>
                            <div className="spacer-40"/>
                            <div className="content-item large-18">
                                Our <Link to={routePaths.client.expertise} onClick={this.handleContentLinkClick}><span>expertise</span></Link> varies from Web & Mobile Applications, .Net, NodeJS, Javascript, HTML, CSS, Cordova, Angular, React, Meteor to Selenium end-to-end testing, Build & Multi-Platform Deployment Automation and many others.
                            </div>
                            <div className="spacer-60"/>
                            <div className="row technologies">
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://angularjs.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/angular.png" title="Angular Js" className="content-item grayscale" /></a></div>
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://cordova.apache.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/cordova.png" title="Apache CORDOVA" className="content-item grayscale" /></a></div>
                                <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://nodejs.org" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/nodejs.png" title="Node Js" className="content-item grayscale" /></a></div>
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://facebook.github.io/react/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/react.png" title="React" className="content-item grayscale" /></a></div>
                                <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns hide-for-medium-only"><a href="https://www.meteor.com/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/meteor.png" title="Meteor" className="content-item grayscale" /></a></div>
                                <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                                <div className="spacer-40 large-24 medium-0 small-0 show-for-large" />
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://www.microsoft.com/net/framework" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/dotNet.png" title="Microsoft .NET" className="content-item grayscale" /></a></div>
                                <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://www.microsoft.com/en-us/cloud-platform/sql-server" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/sql-server.png" title="SQL Server" className="content-item grayscale" /></a></div>
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="https://www.jetbrains.com/teamcity/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/teamcity.png" title="Team City" className="content-item grayscale" /></a></div>
                                <div className="spacer-40 large-0 medium-0 small-0 show-for-large" />
                                <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns hide-for-medium-only"><a href="https://octopus.com/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/octopus.png" title="Octopus Deploy" className="content-item grayscale"/></a></div>
                                <div className="large-3 large-offset-0 medium-6 medium-offset-0 small-12 small-offset-0 columns"><a href="http://www.seleniumhq.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/selenium.png" title="Selenium - Web Browser Automation" className="content-item grayscale" /></a></div>
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="facts large-6 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                            <div className="row">
                                <div className="large-number content-item large-8 large-offset-0 medium-3 medium-offset-0 small-4 small-offset-0 columns">9</div>
                                <div className="content-item large-16 large-offset-0 medium-21 medium-offset-0 small-20 small-offset-0 columns">
                                    <span className="center-v">Software Engineers</span>
                                </div>
                            </div>
                            <div className="spacer-40" />
                            <div className="row">
                                <div className="large-number content-item large-8 large-offset-0 medium-3 medium-offset-0 small-4 small-offset-0 columns">15</div>
                                <div className="content-item large-16 large-offset-0 medium-21 medium-offset-0 small-20 small-offset-0 columns">
                                    <span className="center-v">Years of Expertise</span>
                                </div>
                            </div>
                            <div className="spacer-40" />
                            <div className="row">
                                <div className="large-number content-item large-8 large-offset-0 medium-3 medium-offset-0 small-4 small-offset-0 columns">
                                    <img src="/client/dist/img/icons/english.png" title="United Kingdom" />
                                </div>
                                <div className="content-item large-16 large-offset-0 medium-21 medium-offset-0 small-20 small-offset-0 columns">
                                    <span className="center-v2 fix-lines">Proficient in English speaking and writing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Our work</h1>
                            <div className="spacer-40"/>
                            <div className="content-item large-18">
                                    We worked on various projects and had successful collaborations with partners from the UK, USA, Germany and France until 2011 when we took <Link to={routePaths.client.portfolioSfb} onClick={this.handleContentLinkClick}><span>Safetybank</span></Link> from a 50 hours to an 50 000 hours (and counting) enterprise class project.
                            </div>
                            <div className="spacer-20"/>
                            <div className="content-item large-18">
                                Since 2011 we are working in partnership on <Link to={routePaths.client.portfolioSfb} onClick={this.handleContentLinkClick}><span>Safetybank</span></Link> which is a product that revolutionizes the building environment in the UK and worldwide.
                            </div>
                            <div className="spacer-20"/>
                            <div className="content-item large-18">
                                Safetybank is an enterprise class application with multiple platforms support that was recognised with the "<a href="http://housinginnovationawards.co.uk/portfolio/most-innovative-it-system-app/" target="_blank"><span>Most</span> <span>innovative</span> <span>application</span> <span>in</span> <span>housing</span> <span>industry</span></a>" award in 2016.
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-6 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Why us?</h1>
                            <div className="spacer-40"/>
                            <div className="content-item">We have a <strong>strong & mature agile development process</strong>, constantly refined</div>
                            <div className="spacer-20"/>
                            <div className="content-item">We have a team of <strong>advanced to proficient English</strong> speakers</div>
                            <div className="spacer-20"/>
                            <div className="content-item">We have offices in <strong>London, UK</strong></div>
                            <div className="spacer-20"/>
                            <div className="content-item">We have <strong>development offices in Iasi</strong>, Romania</div>
                        </div>
                    </div>

                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <div className="content-item large-18">If you are looking for recommendations we are more than happy to provide them from:</div>
                            <div className="spacer-40"/>       
                            <div className="recommendations-grid content-item">
                                <div className="row">
                                    <div className="large-6 large-offset-0 medium-12 medium-offset-0 small-24 small-offset-0 columns">
                                        ArrayX, UK<br /><span className="gray">Ben Empson</span>
                                    </div>
                                    <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                    <div className="large-6 large-offset-0 medium-12 medium-offset-0 small-24 small-offset-0 columns">
                                        Proxima, UK / USA<br /><span className="gray">Lance Jones / Roger Lockwood</span>
                                    </div>
                                </div> 
                                <div className="spacer-40"/>
                                <div className="row recommendations">
                                    <div className="large-6 large-offset-0 medium-12 medium-offset-0 small-24 small-offset-0 columns">
                                        Mindcast, USA<br /><span className="gray">Benjamin Kyan</span>
                                    </div>
                                    <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                                    <div className="large-6 large-offset-0 medium-12 medium-offset-0 small-24 small-offset-0 columns">
                                        European Railway Agency, France<br /><span className="gray">Marian Marculet</span>
                                    </div>
                                </div>  
                            </div>
                            <div className="recommendations-list">
                                <div className="content-item">ArrayX, UK<br /><span className="gray">Ben Empson</span></div>
                                <div className="spacer-40" />
                                <div className="content-item">Proxima, UK / USA<br /><span className="gray">Lance Jones / Roger Lockwood</span></div>
                                <div className="spacer-40" />
                                <div className="content-item">Mindcast, USA<br /><span className="gray">Benjamin Kyan</span></div>
                                <div className="spacer-40" />
                                <div className="content-item">European Railway Agency, France<br /><span className="gray">Marian Marculet</span></div>  
                            </div>
                        </div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-6 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <h2 className="content-item">Want to meet us?</h2>
                            <Link className="content-item cta-link" to="/contact" onClick={this.handleContactClick}><span>Let's</span> <span>talk</span></Link>
                        </div>
                    </div>
                    <div className="spacer-60" />
                </section>
                <Footer />
            </article>
        );
    }
}

export default NeedHelpPage;
