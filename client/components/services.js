//import SimpleGrid from '../components/simpleList';
import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';

class Services extends Component {
    // renderRow(item) {
    //     return (<div className={'service col-sm-6 ' + item.key}>
    //         <h4>{item.name}</h4>
    //         <i className={'ncs-' + item.icon} />
    //         <div className="description">{item.description}</div>
    //     </div>);
    // }

    render() {
        //var p = this.props, s = p.strings;
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
            {/*
            <div className="section section--expertise">
                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/assets/img/photos/temp1.jpg" data-ref="background" />
                    </div>
                </div>
                <div className="gradient" data-ref="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content" data-ref="text1">
                                <h1>Another headline text goes here</h1>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="services-list row">
                <h1>{s.services}</h1>
                <SimpleGrid
                    data = {p.items}
                    renderRow = {this.renderRow}
                    numberOfCellsPerRow = {2}
                    />
            </div>
            </div>*/}
            </article>
        );
    }
}

Services.propTypes = {
    strings: PropTypes.object.isRequired,
};

Services.defaultProps = {
    strings: {
        services: 'Services',
    },
};

export default Services;