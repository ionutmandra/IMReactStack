import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

let $ = window.$;

class Expertise extends Component {
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

        document.title = "Adaptabi - Skills, processes and innovation";

        this.$icons = $(this.refs.article).find('.grayscale-container img, .processes i')
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
            <article className="page page-expertise" ref="article">
                <Header ref={'header'} title={'We aim to offer more than just working software by constantly improving our skills and processes'} highlightExpertise/>
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Skills</h1>
                            <div className="spacer-40"/>
                            <p className="content-item">Web and mobile development, server side development and data storage are the top competencies that help us offer full digitalization services.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><a href="https://angularjs.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/angular.png" title="Angular Js" className="content-item grayscale" /></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><a href="https://cordova.apache.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/cordova.png" title="Apache CORDOVA" className="content-item grayscale" /></a></div>
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><a href="https://nodejs.org" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/nodejs.png" title="Node Js" className="content-item grayscale" /></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><a href="https://facebook.github.io/react/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/react.png" title="React" className="content-item grayscale" /></a></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><a href="https://www.meteor.com/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/meteor.png" title="Meteor" className="content-item grayscale" /></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset- small-12 small-offset-0 columns"><a href="https://www.microsoft.com/net/framework" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/dotNet.png" title="Microsoft .NET" className="content-item grayscale" /></a></div>
                        <div className="spacer-40 large-24 medium-0 small-0 show-for-large" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><a href="https://www.microsoft.com/en-us/cloud-platform/sql-server" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/sql-server.png" title="SQL Server" className="content-item grayscale" /></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><a href="http://ecma-international.org/memento/TC39.htm" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/javascript.png" title="Javascript" className="content-item grayscale" /></a></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><a href="https://crosswalk-project.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/crosswalk.png" title="Crosswalk Project" className="content-item grayscale"/></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><a href="https://www.jetbrains.com/teamcity/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/teamcity.png" title="Team City" className="content-item grayscale" /></a></div>
                        <div className="spacer-40 large-0 medium-0 small-0 show-for-large" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><a href="https://octopus.com/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/octopus.png" title="Octopus Deploy" className="content-item grayscale"/></a></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><a href="http://www.seleniumhq.org/" target="_blank" className="grayscale-container"><img src="/client/dist/img/icons/selenium.png" title="Selenium - Web Browser Automation" className="content-item grayscale" /></a></div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1 columns">
                            <h2 className="content-item">Processes</h2>
                            <div className="spacer-40"/>
                            <p className="content-item">They are equally important to us and we believe that only by having adaptable and transparent processes we can meet and exceed client expectations.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_feedback content-item" title="Quick feedback cycles"></i>
                            <div className="spacer-40"/>
                            <h3>Quick feedback cycles</h3>
                            <div className="spacer-20"/>
                            <p className="content-item">Our iterations are kept as short as possible (2 to 4 weeks), and more than that we consider very seriously all the feedback that we get at the end of each iteration, which allows us to continuosly improve functionality, performance, communication and process.</p>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <i className="ncs-processes_delivery content-item" title="Continuous delivery"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Continuous delivery</h3>
                            <div className="spacer-20"/>
                            <p>
                                We aim to deliver as often and as fast as possible. Agile methodologies are at the core of our development process, mainly <a target="_blank" href="http://leansoftwareengineering.com/ksse/scrum-ban/"><span>Scrumban</span></a> and <a target="_blank" href="http://ronjeffries.com/xprog/articles/the-noestimates-movement/"><span>No</span> <span>Estimates</span></a>. We are flexible about the methodology and want to achieve <a target="_blank" href="https://continuousdelivery.com/"><span>Continuous</span> <span>Deployment</span></a>.
                            </p>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_tests content-item" title="Automated tests"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Automated tests</h3>
                            <div className="spacer-20"/>

                            <p>
                                From unit tests to integration tests and from smoke tests to system tests we aim to automate them completely to ensure nothing gets missed. Also we believe that tests should be effective and the <a target="_blank" href="http://martinfowler.com/bliki/TestPyramid.html"><span>Testing</span> <span>Pyramid</span></a> distribution is always taken into account.
                            </p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="spacer-60 large-24 show-for-large"/>
                        <div className="large-5 large-offset-3 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <i className="ncs-processes_automation content-item" title="Build and deployment automation"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Build and deployment automation</h3>
                            <div className="spacer-20"/>
                            <p>
                                We believe that repetitive tasks have to be automated. We achieve strong build processes and unit test automation with <a target="_blank" href="https://www.jetbrains.com/teamcity/"><span>TeamCity</span></a> and <a target="_blank" href="http://www.seleniumhq.org/"><span>Selenium</span></a>, and multi platform, multi environment deployment with <a target="_blank" href="https://octopus.com/"><span>Octopus</span></a> and <a target="_blank" href="https://cordova.apache.org/"><span>Cordova</span></a>.
                            </p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_adaptaion content-item" title="Inspect and adapt on every iteration"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Inspect and adapt on every iteration</h3>
                            <div className="spacer-20"/>
                            <p>
                                At the end of each sprint we analyze our work, identify what can be improved and we always finish with an AMO (Action Moment Owner) list of items. The retrospective meetings are the main trigger of our constant innovation process.
                            </p>
                            <div className="spacer-20"/>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row">
                        <div className="large-13 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1  columns">
                            <h1  id="innovation" className="content-item">Innovation</h1>
                            <div className="spacer-40"/>
                            <p className="content-item">Being one of our core values, innovation is supported in every aspect of our activity, from frameworks and components to build systems and community meetings.</p>
                        </div>
                    </div>
                    <div className="spacer-20"/>
                    <div className="row innovation">
                        <div className="large-12 large-offset-3 medium-18 medium-offset-1 small-22 small-offset-1 columns bullets">
                            <ul className="content-item">
                                <li>Unified build and deployment system for Cordova / Crosswalk mobile applications (instant deployment on all platforms) </li>
                                <li>SPA framework for mobile applications</li>
                                <li>Javascript high performance inheritance mechanism: <a  target="_blank" href="https://github.com/adaptabi/Javascript-FastClass"><span>Fast</span><span>-</span><span>Class</span></a></li>
                                <li>Custom components for Cordova / Crosswalk mobile applications (Smooth signature, Image editor, GPS component, etc.) </li>
                                <li>Initiators and main supporters of <a target="_blank" href="http://www.meetup.com/Meteor-Iasi/"><span>Meteor</span> <span>Group</span> <span>Iasi</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <section className="call-to-action row align-middle">
                    <div className="large-9 large-offset-3 large-order-1 medium-11 medium-offset-1 medium-order-1 small-24 show-for-medium columns">
                        <p className="content-item">Everything changes but our passion.</p>
                        <p className="cta content-item">
                            <span className="show-for-large">Want to meet us?</span>
                            <span className="hide-for-large">Interested?</span>
                            <span className="action-links">
                                <a href="mailto:contact@adaptabi.com?subject=Inquiry"><span>Send</span> <span>a</span> <span>message</span></a>
                            </span>
                        </p>
                    </div>
                    <div className="large-9 large-offset-0 large-order-2 medium-11 medium-offset-0 medium-order-2 columns">
                        <div className="content-item image">
                            <img src="/client/dist/img/photos/temp3.jpg"/>
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
                </section>
                <Footer />
            </article>
        );
    }
}

Expertise.propTypes = {
    strings: PropTypes.object.isRequired,
};

Expertise.defaultProps = {
    strings: {
    },
};

export default Expertise;
