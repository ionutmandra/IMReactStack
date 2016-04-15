import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const stateToProps = state => ({
    items: state.projects.items,
});

class ProjectDetails extends Component {
    render() {
        const key = this.props.params.key,
            items = this.props.items,
            index = _.findIndex(items, i => i.key == key),
            item = index >= 0 ? items[index] : null;

        if (item != null) {
            return (<div className="project">
                Project: <img src={item.img} />
            </div>);
        }
    }
}

export default connect(stateToProps)(ProjectDetails);