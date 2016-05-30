import React, { PropTypes, Component } from 'react';

class Home extends Component {
    render() {
        const s = this.props.strings;               
        // style="background-image: url('client/assets/img/photos/temp1.jpg');"
        return (
           	<div className="section section--about is-active is-last">

                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp1.jpg" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                    </div>
                </div>


                {/*<div className="section section--expertise">
                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp2.jpg" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Another headline text goes here</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section--portfolio">
                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp3.jpg" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Text is looking great on transition</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section--jobs">
                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp4.jpg" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section--contact">
                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp5.jpg" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}

            </div>
        );
    }
}

Home.propTypes = {
    strings: PropTypes.object.isRequired,
};

Home.defaultProps = {
    strings: {
        welcome: 'WELCOME MESSAGE',
    },
};




export default Home;
