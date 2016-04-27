import SimpleGrid from '../components/simpleList';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const stateToProps = state => ({
    items: state.team.gallery,
});

// const actionsToProps = dispatch => ({
//     handleChange: event => dispatch(changeLanguage(event.target.value)),
// });

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

export default connect(stateToProps)(Gallery);