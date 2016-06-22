import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class Expertise extends Component {
     constructor(props) {
        super(props);
        this.handleCallToActionClick = this.handleCallToActionClick.bind(this);
         this.state ={
            cancelScene: 'false'
        };
    }
    handleCallToActionClick(event) {

        this.setState({cancelScene: 'true'});

          this.props.transition({
              type: 'content',
              column: 6,
              target: event.target,
          });
    }


    render() {
        return (
            <article className="page page-expertise">
                <Header ref={'header'} cancelScene={this.state.cancelScene} title={'We aim to offer more than just working software by constantly improving our skills and processes'} />
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <div className="large-8 large-offset-3 medium-18 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Skills</h1>
							<div className="spacer-40"/>
                            <p className="content-item">Web and mobile development, server side development and data storage are the top the competencies that help us offer full digitization services.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><img src="/client/dist/img/icons/angular.png" title="Angular Js" className="content-item"/></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><img src="/client/dist/img/icons/cordova.jpg" title="Apache CORDOVA" className="content-item"/></div>
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><img src="/client/dist/img/icons/nodejs.png" title="Node Js" className="content-item"/></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><img src="/client/dist/img/icons/react.png" title="React" className="content-item"/></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><img src="/client/dist/img/icons/meteor.svg" title="Meteor" className="content-item"/></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset- small-12 small-offset-0 columns"><img src="/client/dist/img/icons/dotNet.jpg" title="Microsoft .NET" className="content-item"/></div>
                        <div className="spacer-40 large-24 medium-0 small- show-for-large" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-0 small-11 small-offset-1 columns"><img src="/client/dist/img/icons/sql-server.png" title="SQL Server" className="content-item"/></div>
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-0 small-12 small-offset-0 columns"><img src="/client/dist/img/icons/javascript.png" title="Javascript" className="content-item"/></div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only" />
                        <div className="spacer-40 large-0 medium-0 small-24 show-for-small-only" />
                        <div className="large-3 large-offset-0 medium-5-5 medium-offset-1 small-11 small-offset-1 columns"><img src="/client/dist/img/icons/crosswalk.png" title="Crosswalk Project" className="content-item"/></div>
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
                        <div className="large-6 large-offset-3 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_feedback content-item" title="Quick feedback cycles"></i>
                            <div className="spacer-40"/>
                            <p className="content-item">  Quick feedback cycles</p>
                        </div>
                        <div className="large-6 large-offset-0 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <i className="ncs-processes_delivery content-item" title="Continuous delivery"></i>
                            <div className="spacer-40"/>
                            <p className="content-item">Continuous delivery</p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="large-6 large-offset-0 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_tests content-item" title="Automated tests"></i>
                            <div className="spacer-40"/>
                            <p className="content-item">Automated tests</p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="spacer-60 show-for-large"/>
                        <div className="large-6 large-offset-3 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <i className="ncs-processes_automation content-item" title="Build and deployment automation"></i>
                            <div className="spacer-40"/>
                            <p className="content-item">Build and deployment automation</p>
                            <div className="spacer-20"/>
                        </div>
                        <div className="large-6 large-offset-0 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <i className="ncs-processes_adaptaion content-item" title="Inspect and adapt on every iteration"></i>
                            <div className="spacer-40"/>
                            <p className="content-item">Inspect and adapt on every iteration</p>
                            <div className="spacer-20"/>
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
                                <Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}>Let's talk</Link></p>
                    </div>
                    <div className="large-9 large-offset-0 large-order-2 medium-11 medium-offset-0 medium-order-2 columns">
                      <div className="content-item image">
                        <img src="/client/dist/img/photos/temp3.jpg"/>
                         <div className="show-for-small-only small-22 small-offset-1 columns small-text-case">
                                <p>Everything changes but our passion.</p>
                                <p className="cta">
                                    <span className="hide-for-large">Interested? </span>
                                    <Link to={routePaths.client.careers} onClick={this.handleCallToActionClick}>Let's talk.</Link>
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
