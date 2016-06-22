import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class CareerJuniorDeveloper extends Component {

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
                            <h1 className="content-item">Junior Developer</h1>
                        </div>
                        <span className="large-3 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <div className="large-9 large-offset-6 columns">
                            <p className="content-item">
                                We are looking for a junior developer to help develop large scale .NET based applications.
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
                                <li>Develop complex, high-availability, high-scalability systems</li>
                                <li>Getting familiar with the product and technologies that the team uses</li>
                                <li>Improve programming skills and increase the area of expertise</li>
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
                                <li>1 year experience in .Net C#</li>
                                <li>1 year experience in Javascript / CSS / HTML</li>
                                <li>1 year experience with design and development of DB data models</li>
                                <li>Good English (writing and speaking)</li>
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }
}

CareerJuniorDeveloper.propTypes = {
    strings: PropTypes.object.isRequired,
};

CareerJuniorDeveloper.defaultProps = {
    strings: {
    },
};

export default CareerJuniorDeveloper;
