import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';

class Portfolio extends Component {
    render() {
        //var p = this.props, s = p.strings;
        //let columns = this.props.children ? 6 : 12;
        return (
            <article className="page-portfolio">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp3.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Portfolio'}</h1></div>
                </header>
                <section>
                    <Lorem />
                </section>
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