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
                        <Link  to="/careers" onClick={this.props.onBackClick} className="large-3 large-offset-3 columns navigation-link back-to-careers"><i className="ncs-chevron-with-circle-left float-left" />Back </Link>
                        <h1 className="large-12 columns">Junior Developer</h1>
                        <span className="large-3 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <p className="large-9 large-offset-6 columns"> 
                            We are looking for a junior developer to help develop large scale .NET based applications.
                        </p>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Responsabilities</h2>
                    </div> 
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>Develop complex, high-availability, high-scalability systems</li>
                            <li>Getting familiar with the product and technologies that the team uses</li>
                            <li>Improve programming skills and increase the area of expertise</li>
                        </ul>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Requirements</h2>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>1 year experience in .Net C#</li>
                            <li>1 year experience in Javascript / CSS / HTML</li>
                            <li>1 year experience with design and development of DB data models</li>
                            <li>Good English (writing and speaking)</li>
                        </ul>
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