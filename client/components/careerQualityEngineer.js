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
                        <div className="large-3 large-offset-3 columns">
                            <Link  to="/careers" onClick={this.props.onBackClick} className="navigation-link back-to-careers content-item block">
                                <i className="ncs-chevron-with-circle-left float-left" />Back
                            </Link>
                        </div>
                        <div className="large-12 columns">
                            <h1 className="content-item">Quality Engineer</h1>
                        </div>
                        <span className="large-3 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
                            <p className="content-item">
                                We are looking for quality engineer to help develop large scale .NET based applications.
                            </p>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
                            <h2 className="content-item">Responsabilities</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
                            <ul className="content-item">
                                <li>Ensure the quality of the products delivered</li>
                                <li>Write test cases</li>
                                <li>Write Selenium based Automated Tests </li>
                            </ul>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
                            <h2 className="content-item">Requirements</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
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
