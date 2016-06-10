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
          this.props.transition({
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
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-12 large-offset-3 columns">We are always looking to get more help in our team and we value the following</div>                          
                    </div>
                    <div className="row">
                      <ul className="large-9 large-offset-6 columns">
                            <li>See <strong>change</strong> as a part of progress</li>
                            <li>Be willing to <strong>communicate clearly</strong> and open</li>
                            <li>Be self driven and <strong>proactive</strong></li>
                            <li>Understand that even work can be <strong>fun</strong></li>
                            <li>See <strong>creativity and innovation</strong> even in the smallest things</li>
                            <li>Continuously <strong>learn and share</strong> knowledge</li>
                        </ul>
                    </div>
                    <div className="spacer-20" />
                     <div className="row">
                        <div className="large-12 large-offset-3 columns">Also there is a list of benefits if you join our team:</div>                          
                    </div>
                    <div className="row">
                      <ul className="large-9 large-offset-6 columns">
                            <li>We have <strong>more free days</strong> than the legally specified number</li>
                            <li>We allocate one <strong> research day every month </strong>for each one of us</li>
                            <li>We understand and support <strong>schedule flexibility</strong></li>
                        </ul>
                    </div>
                    <div className="spacer-100" />
                    <div className="row hide">
                        <div className="large-12 large-offset-3 columns">We are looking for :</div>                          
                    </div>
                    <div className="row">
                        <div className="large-6 large-offset-3 columns">
                            <h1>Senior software developer</h1>
                            <h3>Full time</h3>
                            <Link to="/careers/seniorsoftwaredeveloper" onClick={this.handleCareerDetailsClick}><i className="ncs-chevron-with-circle-right"></i></Link>
                        </div>
                        <div className="large-6 columns">
                            <h1>Junior software developer</h1>
                            <h3>Full time</h3>
                            <Link to="/careers/juniorsoftwaredeveloper" onClick={this.handleCareerDetailsClick}><i className="ncs-chevron-with-circle-right"></i></Link>
                        </div>
                         <div className="large-6 columns">
                            <h1>Quality Engineer</h1>
                            <h3>Full time</h3>
                            <Link to="/careers/qualityengineer" onClick={this.handleCareerDetailsClick}><i className="ncs-chevron-with-circle-right"></i></Link>
                        </div>
                    </div>
                    <div className="spacer-60" />
                    <div className="row"></div>
                    <div className="spacer-100" />
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