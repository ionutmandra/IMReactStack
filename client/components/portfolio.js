import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.handleProjDetailsClick = this.handleProjDetailsClick.bind(this);
    }

    handleProjDetailsClick(event) {
          this.props.transition({
              type: 'content',
              column: 5,
              target: event.target,
          });        
    }

    render() {
        //var p = this.props, s = p.strings;
        //let columns = this.props.children ? 6 : 12;

        let link = routePaths.client.portfolioDetails.replace(':key', 'sfb');

        return (
            <article className="page page-portfolio">
                <Header title={'We create high impact software solutions that help business succeed'} />
                <section className="content">
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h1>
                                <Link ref="projDetails"   to={link} onClick={this.handleProjDetailsClick}>{'Safetybank'}</Link>
                            </h1>
                            <div className="project-description">
                                Safetybank is our largest project and we took it from a 50 hours concept to a 50 000 hours enterprise class application.
                            </div>
                        </div>
                        <div className="large-9 columns">
                            <img src="client/dist/img/photos/prjSfb.png" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <Footer />
            </article>
        );
    }
}

Portfolio.propTypes = {
    strings: PropTypes.object.isRequired,
     transition: PropTypes.func.isRequired,
};

Portfolio.defaultProps = {
    strings: {
    },
};

export default Portfolio;