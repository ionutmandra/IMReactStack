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
                        <Link  to="/careers" onClick={this.props.onBackClick} className="large-3 large-offset-3 columns navigation-link back-to-careers"><i className="ncs-chevron-with-circle-left float-left" />Back </Link>
                        <h1 className="large-12 columns">Quality Engineer</h1>
                        <span className="large-3 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <p className="large-9 large-offset-6 columns">
                            We are looking for quality engineer to help develop large scale .NET based application.
                        </p>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Responsabilities</h2>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>Ensure the quality of the products delivered</li>
                            <li>Writing test cases</li>
                            <li>Writing Selenium based Automated Tests </li>
                            <li>Good English (writing and speaking)</li>
                        </ul>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Requirements</h2>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>1 year experience in manual testing</li>
                            <li>Experience in writing test cases</li>
                            <li>Familiar with Selenium based Automated Tests </li>
                        </ul>
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
