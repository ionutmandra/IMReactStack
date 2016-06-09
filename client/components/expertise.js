import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import routePaths from '../../common/routePaths';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';

class Expertise extends Component {
    render() {
        return (
            <article className="page page-expertise">
                <Header title={'We aim to offer more than just working software by constantly improving our skills and processes'} />
                <section className="content">
                    <div className="row">
                        <div className="large-13 large-offset-3 columns">
                            <h1>Text introductiv pentru cele 5 categorii</h1>
                            <p>Web and mobile development, server side development and data storage are the top the competencies that help us offer full digitization services.</p>
                        </div>
                    </div>
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 columns"><img src="/client/dist/img/icons/angular.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/cordova.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/nodejs.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/react.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/meteor.svg" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/dotNet.jpg" /></div>
                    </div>
                    <div className="spacer-40" />
                    <div className="row technologies">
                        <div className="large-3 large-offset-3 columns"><img src="/client/dist/img/icons/sql-server.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/javascript.png" /></div>
                        <div className="large-3 columns"><img src="/client/dist/img/icons/crosswalk.png" /></div>
                    </div>
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-13 large-offset-3 columns">
                            <h2>Procese</h2>
                            <div className="spacer-40"/>
                            <p>The processes are equally important to us and we believe that only by having adaptable and transparent processes we can meet and also exced client expectations.</p>
                        </div>
                    </div>
                    <div className="spacer-40"/>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <div className="spacer-40"/>
                            <strong>Quick feedback cycles</strong>
                            <div className="spacer-20"/>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <div className="spacer-40"/>
                            <strong>Continuous delivery</strong>
                            <div className="spacer-20"/>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <div className="spacer-40"/>
                            <strong>Automated tests</strong>
                            <div className="spacer-20"/>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                    </div>
                    <div className="spacer-60"/>
                    <div className="row processes">
                        <div className="large-5 large-offset-3 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <div className="spacer-40"/>
                            <strong>Build and deployment automation</strong>
                            <div className="spacer-20"/>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                        <div className="large-5 large-offset-1 columns">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
                            <div className="spacer-40"/>
                            <strong>Inspect and adapt on every iteration</strong>
                            <div className="spacer-20"/>
                            <p>Nunc sit amet tincidunt odio. Praesent quis posuere magna, quis mollis libero.</p>
                        </div>
                    </div>
                    <div className="spacer-100" />
                </section>
                <section className="call-to-action row align-middle">
                    <div className="large-9 large-offset-3 columns">
                        <p>Everything changes but our passion.</p>
                        <p className="cta">Want to meet us? <Link to={routePaths.client.careers}>Let's talk</Link></p>
                    </div>
                    <div className="image large-9 columns">
                        <img src="/client/dist/img/photos/temp3.jpg" />
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