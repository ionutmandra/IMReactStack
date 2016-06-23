import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';

class Careers extends Component {


     constructor(props) {
        super(props);
        this.handleCareerDetailsClick = this.handleCareerDetailsClick.bind(this);
    }

    handleCareerDetailsClick(event) {
          this.props.dispatchTransition({
              type: 'content',
              column: 6,
              target: event.target,
          });
    }

    render() {
        return (
            <article className="page page-careers">
                <Header title={'We treat every member of our team as a part of the family so we work and also have fun together'} />
                <section className="content">
                    <div className="spacer-60" />
                    <div className="row">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                         <p className="content-item">We are always looking to get more help in our team and we value the following</p>
                        </div>
                    </div>
                    <div className="spacer-20" />
                    <div className="row">
                        <div className="large-9 large-offset-6 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <ul className="content-item">
                                <li>See <strong>change</strong> as a part of progress</li>
                                <li>Be willing to <strong>communicate clearly</strong> and open</li>
                                <li>Be self driven and <strong>proactive</strong></li>
                                <li>Understand that work is <strong>fun</strong></li>
                                <li>See <strong>creativity and innovation</strong> even in the smallest things</li>
                                <li>Continuously <strong>learn and share</strong> knowledge</li>
                            </ul>
                         </div>
                    </div>
                    <div className="spacer-60" />
                    <div className="row">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <p className="content-item">Also there is a list of benefits if you join our team:</p>
                        </div>
                    </div>
                    <div className="spacer-20" />
                    <div className="row">
                    <div className="large-9 large-offset-6 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                        <ul className="content-item">
                          <li>We have <strong>more free days</strong> than the standard</li>
                          <li>We allocate <strong> research days every month </strong></li>
                          <li>We understand and support <strong>schedule flexibility</strong></li>
                      </ul>
                    </div>
                    </div>
                    <div className="spacer-100 show-for-large" />
                    <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only"/>
                    <div className="spacer-60 large-0 medium-0 small-24 show-for-small-only"/>
                    <div className="row hide">
                        <div className="large-12 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">We are looking for :</div>
                    </div>
                    <div className="row">
                        <div className="large-6 large-offset-3 medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <Link to="/careers/seniorsoftwaredeveloper" onClick={this.handleCareerDetailsClick} className="content-item block">
                            <div className="large-24 medium-24 small-21 columns">
                                    <h1>Senior software developer</h1>
                                    <h3>Full time</h3>
                                </div>
                                <div className="large-24 medium-24 small-3 columns go-to-career-details-container">
                                    <i className="ncs-chevron-with-circle-right float-right"></i>
                                </div>
                            </Link>
                        </div>
                        <div className="spacer-20 large-0 medium-0 small-24 show-for-small-only"/>
                        <div className="large-6 large-offset-0 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <Link to="/careers/juniorsoftwaredeveloper" onClick={this.handleCareerDetailsClick} className="content-item block">
                                <div className="large-24 medium-24 small-21 columns">
                                    <h1>Junior software developer</h1>
                                    <h3>Full time</h3>
                                </div>
                                <div className="large-24 medium-24 small-3 columns go-to-career-details-container">
                                    <i className="ncs-chevron-with-circle-right float-right"></i>
                                </div>
                            </Link>
                        </div>
                        <div className="spacer-40 large-0 medium-24 small-0 show-for-medium-only"/>
                        <div className="spacer-20 large-0 medium-0 small-24 show-for-small-only"/>
                         <div className="large-6 large-offset-0  medium-11 medium-offset-1 small-22 small-offset-1 columns">
                            <Link to="/careers/qualityengineer" onClick={this.handleCareerDetailsClick} className="content-item block">
                                <div className="large-24 medium-24 small-21 columns">
                                    <h1>Quality Engineer</h1>
                                    <h3>Full time</h3>
                                </div>
                                <div className="large-24 medium-24 small-3 columns go-to-career-details-container">
                                    <i className="ncs-chevron-with-circle-right float-right"></i>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="spacer-60" />
                    <div className="row"></div>
                    <div className="spacer-100 show-for-large" />
                </section>
                <Footer />
            </article>
        );
    }
}

Careers.propTypes = {
    strings: PropTypes.object.isRequired,
};

Careers.defaultProps = {
    strings: {
    },
};

export default Careers;
