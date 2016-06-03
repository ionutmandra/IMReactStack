import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';

class Expertise extends Component {
    render() {
        return (
            <article className="page-expertise">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp2.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Expertise'}</h1></div>
                </header>
                <section>
                    <Lorem />
                </section>
            </article>
        );
    }
}

Expertise.propTypes = {
    strings: PropTypes.object.isRequired,
};

Expertise.defaultProps = {
    strings: {
    },
};

export default Expertise;