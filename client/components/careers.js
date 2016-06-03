import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';

class Careers extends Component {
    render() {
        return (
            <article className="page-careers">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp4.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Careers'}</h1></div>
                </header>
                <section>
                    <Lorem />
                </section>
            </article>
        );
    }
}

Careers.propTypes = {
    strings: PropTypes.object.isRequired,
};

Careers.defaultProps = {
    strings: {
    },
};

export default Careers;