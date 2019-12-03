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
            <div className="services-list row">
                <h1>{s.services}</h1>
                <SimpleGrid
                    data = {p.items}
                    renderRow = {this.renderRow}
                    numberOfCellsPerRow = {2}
                    />
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