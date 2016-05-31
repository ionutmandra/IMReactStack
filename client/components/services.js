import SimpleGrid from '../components/simpleList';
import React, { PropTypes, Component } from 'react';

class Services extends Component {
    renderRow(item) {
        return (<div className={'service col-sm-6 ' + item.key}>
            <h4>{item.name}</h4>
            <i className={'ncs-' + item.icon} />
            <div className="description">{item.description}</div>
        </div>);
    }

    render() {
        var p = this.props, s = p.strings;
        return (
            <div className="section section--expertise">
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
                                <h1>Another headline text goes here</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="services-list row">
                <h1>{s.services}</h1>
                <SimpleGrid
                    data = {p.items}
                    renderRow = {this.renderRow}
                    numberOfCellsPerRow = {2}
                    />
            </div>*/}
            </div>
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