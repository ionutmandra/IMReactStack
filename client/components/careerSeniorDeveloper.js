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
                        <div className="large-3 large-offset-3 medium-5-5 medium-offset-1 medium-order-1 small-22 small-offset-1 small-order-1 columns">
                            <Link  to="/careers" onClick={this.props.onBackClick} className="navigation-link back-to-careers content-item block">
                                <i className="ncs-chevron-with-circle-left float-left" />Back
                            </Link>
                        </div>
                        <div className="large-12 large-offset-0 medium-11 medium-order-2 medium-offset-0 small-22 small-offset-1 small-order-3 columns">
                        <div className="spacer-40 small-24 show-for-small-only" />
                            <h1 className="content-item">Senior Developer</h1>
                        </div>
                        <span className="large-3 large-offset-0 medium-5-5 medium-order-3 medium-offset-1 small-22 small-offset-0 small-order-2 columns navigation-link go-to-apply hide">Apply <i className="ncs-chevron-with-circle-right float-right" /></span>
                    </div>
                    <div className="spacer-40"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6 medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <p className="content-item">
                                We are looking for a full stack software developer to be a part of our team. He will have a real opportunity to be part of the decision making process when it comes to architecture, technologies and process.
                            </p>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <h2 className="content-item">Responsabilities</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <ul className="content-item">
                                <li>Develop complex, high-availability, high-scalability systems</li>
                                <li>Write design documents and best practices</li>
                                <li>Stay up-to-date and explore new innovative technologies</li>
                                <li>Able to educate inexperienced developers on best practices of developing a full stack application</li>
                            </ul>
                        </div>
                    </div>
                    <div className="spacer-60"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <h2 className="content-item">Requirements</h2>
                        </div>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="row">
                        <div className=" medium-5-5 medium-offset-1 show-for-medium-only columns"></div>
                        <div className="large-9 large-offset-6  medium-11 medium-offset-0 small-22 small-offset-1 columns">
                            <ul className="content-item">
                                <li>5 year experience in .Net C#</li>
                                <li>5 year experience in Javascript / CSS / HTML</li>
                                <li>5 year experience with design and development of DB data models</li>
                                <li>Strong understanding of javascript frameworks (Node.js, Angular, React, etc.)</li>
                                <li>Good English (writing and speaking)</li>
                            </ul>
                        </div>
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
