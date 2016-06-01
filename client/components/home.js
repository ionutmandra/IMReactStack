import React, { PropTypes, Component } from 'react';

class Home extends Component {
    render() {
        const s = this.props.strings;               
        // style="background-image: url('client/assets/img/photos/temp1.jpg');"
        return (
           	<div className="section section--about">
                <div className="gradient"></div>

                <div className="section-content" id="sectionContent1">
                    <div className="image-to-back-wrap" id='kk'>
                        <div className="image-to-back">
                            <img src="client/assets/img/photos/temp1.jpg" data-ref="background" />
                        </div>
                    </div>

                    <div className="row content">
                        <div className="columns large-12 text-right">
                            <div className="grid-block-wrap1">
                                <div className="grid-block1">
                                    <div className="grid-block-contentl" data-ref="text1">
                                        <h1>Software Innovators Happily Together</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns large-12  text-left">
                            <div className="grid-block-wrap1 delayed">
                                <div className="grid-block1">
                                    <div className="grid-block-contentr" data-ref="text2">
                                        <h2>Create a truly remarkable working environment and deliver high quality.innovative software producst and services</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="columns large-24 text-center">
                            <h2 id="scrollMore">Find out more</h2>
                        </div>
                    </div>

                </div>

                {/*<div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp1.jpg" data-ref="background" />
                    </div>
                </div>
                <div className="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content" data-ref="text1">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                        <div className="grid-block">
                            <div className="grid-block-content" data-ref="text2">
                                <h1>Secondary text</h1>
                            </div>
                        </div>
                    </div>
                </div>
                */}
                
                {/*<div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content">
                                <h1>Software Innovators Happily Together</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section section--expertise">
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
