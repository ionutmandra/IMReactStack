import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class Expertise extends Component {
     constructor(props) {
        super(props);
        this.handleCallToActionClick = this.handleCallToActionClick.bind(this);
        this.onContactClick = this.onContactClick.bind(this);
    }
    handleCallToActionClick(event) {
        this.props.disableScenes();
        this.props.dispatchTransition({
            type: 'content',
            column: 6,
            target: event.target,
        });
    }

     onContactClick(event){
    //console.log('DORU needs to implement');
    this.props.dispatchTransition({
      type: 'openContact',
    });
  }

  componentDidMount(){
    //   $('.grayscale-container').on('mouseenter mouseleave', function (e){
    //     console.log('mouseleave/mouseenter');
    //     $('.grayscale', this).toggleClass('hover grayscale-off');
    //     $(this).find('.post-link').toggle();
    // });
  }


    render() {
        return (
            <article className="page page-expertise">
                <Header ref={'header'} title={'We aim to offer more than just working software by constantly improving our skills and processes'} />
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-18 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Skills</h1>
							<div className="spacer-40"/>
                            <p className="content-item">Web and mobile development, server side development and data storage are the top competencies that help us offer full digitization services.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/angular.png" title="Angular Js" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/cordova.jpg" title="Apache CORDOVA" className="content-item grayscale"/></span></div>
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/nodejs.png" title="Node Js" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/react.png" title="React" className="content-item grayscale"/></span></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/meteor.svg" title="Meteor" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset- small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/dotNet.jpg" title="Microsoft .NET" className="content-item grayscale"/></span></div>
                        <div className="spacer-40 large-24 medium-0 small-0 show-for-large" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/sql-server.png" title="SQL Server" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/javascript.png" title="Javascript" className="content-item grayscale"/></span></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/crosswalk.png" title="Crosswalk Project" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/teamcity.jpg" title="Team City" className="content-item grayscale"/></span></div>
                        <div className="spacer-40 large-0 medium-0 small-0 show-for-large" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/octopus.png" title="Octopus Deploy" className="content-item grayscale"/></span></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><span className="grayscale-container"><img src="/client/dist/img/icons/selenium.png" title="Selenium - Web Browser Automation" className="content-item grayscale"/></span></div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-13 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1  columns">
                            <h2 className="content-item">Processes</h2>
                            <div className="spacer-40"/>
                            <p className="content-item">The processes are equally important to us and we believe that only by having adaptable and transparent processes we can meet and also exced client expectations.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_feedback content-item" title="Quick feedback cycles"></i>
                            <div className="spacer-40"/>
                            <h3>Quick feedback cycles</h3>
                            <div className="spacer-20"/>
                            <p className="content-item">Our iterations are kept as short as possible (2 to 4 weeks), and more than that we consider very seriously all the feedback that we get at the end of each iteration, from functionality and performance issues to communication and process issues that appear within the iteration.</p>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <i className="ncs-processes_delivery content-item" title="Continuous delivery"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Continuous delivery</h3>
                            <div className="spacer-20"/>
                            <p>
                                We aim to deliver as often and as fast as possible all the features that are implemented by our team. Agile methodologies are at the core of development process and our favorite one would be a hybrid between <a href="http://leansoftwareengineering.com/ksse/scrum-ban/">Scrumban</a> and <a href="http://ronjeffries.com/xprog/articles/the-noestimates-movement/">No Estimates</a>. We are flexible about the methodology and ideally we want to achieve <a href="https://continuousdelivery.com/">Continuous Deployment</a>.
                            </p>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_tests content-item" title="Automated tests"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Automated tests</h3>
                            <div className="spacer-20"/>

                            <p>
                                From unit tests to integration tests and from smoke tests to system tests we aim to automate them completely to ensure nothing gets missed. Also we believe that tests should be effective and the <a href="http://martinfowler.com/bliki/TestPyramid.html">Testing Pyramid</a> distribution is taken always into account.
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
                                We strongly believe that repetitive tasks have to be automated, hence we have been directing our attention on implementing strong build processes and unit test automation on <a href="https://www.jetbrains.com/teamcity/"> TeamCity</a> and <a href="http://www.seleniumhq.org/"> Selenium</a>, and multi platform, multi environment deployment with <a href="https://octopus.com/">Octopus</a> and <a href="https://cordova.apache.org/">Cordova</a>.
                            </p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="large-5 large-offset-1 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_adaptaion content-item" title="Inspect and adapt on every iteration"></i>
                            <div className="spacer-40"/>
                            <h3 className="content-item">Inspect and adapt on every iteration</h3>
                            <div className="spacer-20"/>
                            <p>
                                At the end of each sprint we analyze our work, identify what can be improved and we always finish with an AMO (Action Moment Owner) list of items. The retrospective meetings are the main trigger of our constant Innovation process.
                            </p>
                            <div className="spacer-20"/>
                        </div>
                    </div>
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-13 large-offset-3 medium-14 medium-offset-1 small-22 small-offset-1  columns">
                            <h1  id="innovation" className="content-item">Innovation</h1>
                            <div className="spacer-40"/>
                            <p className="content-item">Being one of our core values, innovation is supported in every aspect of our activity, from frameworks and components to build systems and even communities meetings.</p>
                        </div>
                    </div>
                    <div className="spacer-20"/>
                    <div className="row innovation">
                        <div className="large-12 large-offset-3 medium-18 medium-offset-1 small-22 small-offset-1 columns">
                            <div className="spacer-40"/>
                            <ul className="content-item">
                                <li>Unified build and deployment system for Cordova / Crosswalk mobile applications (instant deployment on all platforms)</li>
                                <li>SPA framework for mobile applications</li>
                                <li>Javascript high performance inheritance mechanism - <a href="https://github.com/adaptabi/Javascript-FastClass">Fast-Class</a></li>
                                <li>Custom components for Cordova / Crosswalk mobile applications (Smooth signature, Image editor, GPS component)</li>
                                <li>Initiators and main supporters of <a href="http://www.meetup.com/Meteor-Iasi/">Meteor Group Iasi</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <section className="call-to-action row align-middle">
                    <div className="large-9 large-offset-3 large-order-1 medium-11 medium-offset-1 medium-order-1 small-24 show-for-medium columns">
                        <p className="content-item">Everything changes but our passion.</p>
                        <p className="cta content-item">
                                <span className="show-for-large">Want to meet us? </span>
                                <span className="hide-for-large">Interested? </span>
                                <span className="action-links">
                                    <a onClick={this.onContactClick}>Send a message</a> or
                                    <Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}> join the family.</Link>
                                </span>
                        </p>
                    </div>
                    <div className="large-9 large-offset-0 large-order-2 medium-11 medium-offset-0 medium-order-2 columns">
                      <div className="content-item image">
                        <img src="/client/dist/img/photos/temp3.jpg"/>
                         <div className="show-for-small-only small-22 small-offset-1 columns small-text-case">
                                <p>Everything changes but our passion.</p>
                                <p className="cta">
                                    <span className="hide-for-large">Interested? </span>
                                    <span className="action-links">
                                        <a onClick={this.onContactClick}>Send a message</a> or
                                        <Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}> join the family.</Link>
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
