import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';

class CareerDetails extends Component {

     constructor(props) {
        super(props);
        this.handleBackToCareersClick = this.handleBackToCareersClick.bind(this);
    }

    handleBackToCareersClick(event) {
          this.props.transition({
              type: 'content',
              column: 6,
              target: event.target,
          });        
    }

    render() {
        
         if (this.props.params.key === 'qualityassurance'){
            return (
                <article className="page-career-details">
                    <Header title={'Careers'} />
                    <section className="content">
                        <div className="spacer-100"></div>
                        <div className="row">
                            <Link  to="/careers" onClick={this.handleBackToCareersClick} className="large-3 large-offset-3 columns navigation-link back-to-careers"><i className="ncs-chevron-with-circle-left float-left" />Back </Link>
                            <h1 className="large-12 columns">Quality Assurance</h1>
                            {
                             //  <span className="large-3 columns navigation-link go-to-apply">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                            }
                            
                        </div>
                        <div className="spacer-40"></div>

                        <div className="row">
                            <p className="large-9 large-offset-6 columns"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget lectus at metus mollis fermentum id id tortor. Donec sit amet sapien in quam viverra cursus. Etiam et lobortis arcu. Donec dignissim ipsum nec malesuada placerat. Cras ut hendrerit risus. Quisque eu consectetur enim. Phasellus vulputate id felis quis hendrerit. Curabitur at eleifend eros. Sed dapibus nulla vitae enim ullamcorper posuere. Fusce a diam mauris. Proin et nulla id neque bibendum vulputate.
                            </p>
                        </div>
                        <div className="spacer-60"></div>
                        <div className="row">
                            <h2 className="large-9 large-offset-6 columns">Responsabilities</h2>
                        </div> 
                        <div className="spacer-20"></div>
                        <div className="row">
                            <ul className="large-9 large-offset-6 columns">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ul>
                        </div>
                        <div className="spacer-60"></div>
                        <div className="row">
                            <h2 className="large-9 large-offset-6 columns">Requirements</h2>
                        </div>
                        <div className="spacer-20"></div>
                        <div className="row">
                            <ul className="large-9 large-offset-6 columns">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ul>
                        </div>
                        <div className="spacer-100"></div>
                    </section>
                    <Footer />
            </article>
        );

         }else{
            return (
            <article className="page-career-details">
                <Header title={'Careers'} />
                <section className="content">
                    <div className="spacer-100"></div>
                    <div className="row">
                        <Link  to="/careers" onClick={this.handleBackToCareersClick} className="large-3 large-offset-3 columns navigation-link back-to-careers"><i className="ncs-chevron-with-circle-left float-left" />Back </Link>
                        <h1 className="large-12 columns">Backend Deveoper</h1>
                        {
                         //  <span className="large-3 columns navigation-link go-to-apply">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                        }
                        
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <p className="large-9 large-offset-6 columns"> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget lectus at metus mollis fermentum id id tortor. Donec sit amet sapien in quam viverra cursus. Etiam et lobortis arcu. Donec dignissim ipsum nec malesuada placerat. Cras ut hendrerit risus. Quisque eu consectetur enim. Phasellus vulputate id felis quis hendrerit. Curabitur at eleifend eros. Sed dapibus nulla vitae enim ullamcorper posuere. Fusce a diam mauris. Proin et nulla id neque bibendum vulputate.
                        </p>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Responsabilities</h2>
                    </div> 
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        </ul>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Requirements</h2>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        </ul>
                    </div>
                    <div className="spacer-100"></div>
                </section>
                <Footer />
            </article>
        );
         }
    }
}

CareerDetails.propTypes = {
    strings: PropTypes.object.isRequired,
};

CareerDetails.defaultProps = {
    strings: {
    },
};

export default CareerDetails;