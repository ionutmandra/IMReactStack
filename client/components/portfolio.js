import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class Portfolio extends Component {
    render() {
        //var p = this.props, s = p.strings;
        //let columns = this.props.children ? 6 : 12;
        return (
            <article className="page page-portfolio">
                <Header title={'Scurt text despre Adaptabi ca si companie: cine sunt, ce fac si care este misiunea lor.'} />
                <section className="content">
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h1><a href="portfolio/sfb">Safetybank</a></h1>
                            <div className="project-description">
                                Scurt text despre ce inseamna Safetybank pentru Adaptabi.Nunc sit amet tincidunt odio.Praesent quis posuere magna, quis mollis libero
                            </div>
                        </div>
                        <div className="large-9 columns">
                            <img src="client/assets/img/photos/prjSfb.png" />
                        </div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row align-middle">
                        <div className="large-9 large-offset-3 columns">
                            <h1>EForms</h1>
                            <div className="project-description">
                                Scurt text despre ce inseamna Safetybank pentru Adaptabi.Nunc sit amet tincidunt odio.Praesent quis posuere magna, quis mollis libero
                            </div>
                        </div>
                        <div className="large-9 columns">
                            <img src="client/assets/img/photos/prjSfb.png" />
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
};

Portfolio.defaultProps = {
    strings: {
    },
};

export default Portfolio;