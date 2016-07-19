import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class CareerQualityEngineer extends Component {

     constructor(props) {
        super(props);
    }

    render() {
            return (
                <div>
                    <div className="row">
                         <div className="large-3 large-offset-3 medium-5-5 medium-offset-1 medium-order-1 small-22 small-offset-1 small-order-1 columns">
                            <Link  to="/careers" onClick={this.props.onBackClick} className="navigation-link back-to-careers content-item block">
                                <i className="ncs-chevron-with-circle-left float-left" />Back
                            </Link>
                        </div>
                        <div className="large-12 large-offset-0 medium-11 medium-order-2 medium-offset-0 small-22 small-offset-1 small-order-3 columns">
                        <div className="spacer-40 small-24 show-for-small-only" />
                            <h1 className="content-item">Quality Engineer</h1>
                        </div>
                        <span className="large-3 large-offset-0 medium-5-5 medium-order-3 medium-offset-1 small-22 small-offset-0 small-order-2 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <p className="content-item">
                                We are looking for a quality engineer to help develop full stack applications.
                            </p>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <h2 className="content-item">Responsabilities</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <ul className="content-item">
                                <li>Ensure the quality of the delivered products</li>
                                <li>Write test cases</li>
                                <li>Write Selenium based Automated Tests</li>
                            </ul>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <h2 className="content-item">Requirements</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <ul className="content-item">
                                <li>1 year experience in manual testing</li>
                                <li>Experience in writing test cases</li>
                                <li>Familiar with Selenium based Automated Tests </li>
                                <li>Good English (writing and speaking)</li>
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }
}

CareerQualityEngineer.propTypes = {
    strings: PropTypes.object.isRequired,
};

CareerQualityEngineer.defaultProps = {
    strings: {
    },
};

export default CareerQualityEngineer;
