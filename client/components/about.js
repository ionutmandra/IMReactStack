import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';

class About extends Component {
    render() {
        return (
            <article className="page page-about">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp1.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Scurt text despre Adaptabi ca si companie: cine sunt, ce fac si care este misiunea lor'}</h1></div>
                </header>
                <section className="content">
                    <h1>Lorem ipsum dolor sit amet, consectetur lorem ipsum</h1>
                    <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero. Phasellus quis nibh velit.</p>
                    <div className="image"><img src="/client/dist/img/photos/temp1.jpg" /></div>
                    <h2>Core values</h2>
                    <p>We believe in <strong>happiness</strong> by enjoying what we do and doing what really matters.</p>
                    <p>We believe in energizing ourselves by following our <strong>passion</strong>.</p>
                    <p>We believe there should be a clear <strong>purpose</strong> in everything we do.</p>
                    <p>We believe <strong>trust</strong> in each other will allow us to be more autonomous and responsible.</p>
                    <p>We believe in delivering quality by continuous learning and <strong>professionalism</strong>.</p>
                    <p>We believe openness and transparency always leads to meaningful <strong>communication</strong>.</p>
                    <p>We believe everything changes so <strong>adaptability</strong> and <strong>innovation</strong> are essential.</p>
                    <div className="image"><img src="/client/dist/img/photos/temp2.jpg" /></div>
                    <h2>The team</h2>
                    <ul className="team">
                        <li><h3>Tudor Popescu</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>Nume foarte lung pe 1 rand</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>Nume foarte lung pe doua randuri</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>John Doe</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>Tudor Popescu</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>John Doe</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>Tudor Popescu</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                        <li><h3>John Doe</h3><small>CEO</small><Link to="https://www.linkedin.com/">Linkedin</Link></li>
                    </ul>
                    <section className="call-to-action">
                        <img src="/client/dist/img/photos/temp3.jpg" />
                        <p>Everything changes but our passion.</p>
                        <p className="cta">Want to meet us? <Link to={routePaths.client.careers}>Let's talk</Link></p>
                    </section>
                </section>
            </article>
        );
    }
}

About.propTypes = {
    strings: PropTypes.object.isRequired,
};

About.defaultProps = {
    strings: {
    },
};

export default About;