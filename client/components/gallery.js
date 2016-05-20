import React, { Component } from 'react';
import SimpleGrid from '../components/simpleList';

class Gallery extends Component {

    renderRow(item) {
        return <img src={item.img} className="pull-xs-left m-r-1" />;
    }

    render() {
        var p = this.props;
        return (
            <div className="gallery-list">
                <SimpleGrid
                    data = {p.items}
                    renderRow = {this.renderRow}
                    numberOfCellsPerRow = {5}
                    />
            </div>
        );
    }
}

export default Gallery;