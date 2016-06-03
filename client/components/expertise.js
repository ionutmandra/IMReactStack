import React, { PropTypes, Component } from 'react';

class Expertise extends Component {
    render() {
        return (
            <article className="page page-expertise">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp2.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Scurt text despre Adaptabi ca si companie: cine sunt, ce fac si care este misiunea lor'}</h1></div>
                </header>
                <section className="content">
                    asd
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