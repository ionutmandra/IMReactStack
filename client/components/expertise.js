import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import Footer from '../containers/footerContainer';

class Expertise extends Component {
    render() {
        return (
            <article className="page page-expertise">
                <header>
                    <div className="image-container"><img src="client/assets/img/photos/temp2.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Scurt text despre expertiza Adaptabi si cum il poate ajuta pe client.'}</h1></div>
                </header>
                <section className="content">
                    <div className="row">
                        <div className="large-13 large-offset-3 columns">
                            <h1>Text introductiv pentru cele 5 categorii</h1>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero. Phasellus quis nibh velit. Curabitur ornare quam non nisi pretium, a euismod tortor blandit. Pellentesque malesuada et tellus et aliquam.</p>
                        </div>
                    </div>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 columns"><img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/angular-symbol-128.png" /></div>
                        <div className="large-3 columns"><img src="https://cordova.apache.org/static/img/cordova_bot.png" /></div>
                        <div className="large-3 columns"><img src="https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png" /></div>
                        <div className="large-3 columns"><img src="https://s3.amazonaws.com/media-p.slid.es/uploads/jhabdas/images/969312/react-logo-1000-transparent.png" /></div>
                        <div className="large-3 columns"><img src="https://worldvectorlogo.com/logos/meteor-icon.svg" /></div>
                        <div className="large-3 columns"><img src="https://assets.toptal.io/uploads/blog/category/logo/8/logo-01-8a2a427ba9687a06706bf738d16ec6ae.jpg" /></div>
                    </div>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 columns"><img src="https://skyvia.com/connectors/images/sql-server.png" /></div>
                        <div className="large-3 columns"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" /></div>
                        <div className="large-3 columns"><img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/angular-symbol-128.png" /></div>
                        <div className="large-3 columns"><img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/angular-symbol-128.png" /></div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-13 large-offset-3 columns">
                            <h2>Procese</h2>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero. Phasellus quis nibh velit. Curabitur ornare quam non nisi pretium, a euismod tortor blandit. Pellentesque malesuada et tellus et aliquam.</p>
                        </div>
                    </div>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <strong>Quick feedback cycles</strong>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <strong>Quick feedback cycles</strong>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <strong>Quick feedback cycles</strong>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                    </div>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <strong>Quick feedback cycles</strong>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <strong>Quick feedback cycles</strong>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <section className="call-to-action row align-middle">
                    <div className="image large-9 columns">
                        <img src="/client/dist/img/photos/temp3.jpg" />
                    </div>
                    <div className="large-8 large-offset-3 columns">
                        <p>Everything changes but our passion.</p>
                        <p className="cta">Want to meet us? <Link to={routePaths.client.careers}>Let's talk</Link></p>
                    </div>
                </section>
                <Footer />
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