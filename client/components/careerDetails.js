import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class CareerDetails extends Component {
    render() {
        return (
            <article className="page-career-details">
                <Header title={'Careers'} />
                <section className="content">
                    <div className="spacer-100"></div>
                	<div className="row">
                        <span className="large-3 large-offset-3 columns"><i className="ncs-caret-left" />Back </span>
                        <span className="large-3 columns">Backend Deveoper</span>
                        <span className="large-3 columns">Apply <i className="ncs-caret-right" /></span>
                    </div>
                    <div className="row"> Text</div>
                    <div className="spacer-60"></div>
                    <div className="row">Text</div> 
                    <div className="spacer-20"></div>
                    <div className="row">Text</div>
                    <div className="spacer-60"></div>
                    <div className="row">Text</div>
                    <div className="spacer-20"></div>
                    <div className="row">Text</div>
                    <div className="spacer-100"></div>
                </section>
                <Footer />
            </article>
        );
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