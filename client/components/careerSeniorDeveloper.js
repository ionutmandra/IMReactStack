import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class CareerSeniorDeveloper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
            return (
                <div>
                    <div className="row">
                        <Link  to="/careers" onClick={this.props.onBackClick} className="large-3 large-offset-3 columns navigation-link back-to-careers"><i className="ncs-chevron-with-circle-left float-left" />Back </Link>
                        <h1 className="large-12 columns">Senior Developer</h1>
                        <span className="large-3 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>

                    <div className="row">
                        <p className="large-9 large-offset-6 columns"> 
                            We are looking for a software developer to be a part of the team developing large scale .NET based applications. He will have a real opportunity to be part of the decision making process when it comes to architecture, technologies and finally build our products
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
                            <li>Write design documents and best practices</li>
                            <li>Stay up-to-date and explore new innovative technologies</li>
                            <li>Able to educate inexperienced developers on best practices of developing a full stack application</li>
                        </ul>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <h2 className="large-9 large-offset-6 columns">Requirements</h2>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <ul className="large-9 large-offset-6 columns">
                            <li>5 year experience in .Net C#</li>
                            <li>5 year experience in Javascript / CSS / HTML</li>
                            <li>5 year experience with design and development of DB data models</li>
                            <li>Good English (writing and speaking)</li>
                        </ul>
                    </div>
                </div>
        );
    }
}

CareerSeniorDeveloper.propTypes = {
    strings: PropTypes.object.isRequired,
};

CareerSeniorDeveloper.defaultProps = {
    strings: {
    },
};

export default CareerSeniorDeveloper;