import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import translate from '../hoc/translate';
import _ from 'lodash';
const routePaths = require('../../common/routePaths');

const stateToProps = state => ({
    items: state.projects.items,
});

class ProjectDetails extends Component {
    render() {
        const s = this.props.strings,
            key = this.props.params.key,
            items = this.props.items,
            index = _.findIndex(items, i => i.key == key),
            item = index >= 0 ? items[index] : null,
            link = routePaths.client.projects;

        if (item != null) {
            return (<div className="project">
                <Link to={link} className="pull-xs-right close-page">
                    <i className="ncs-close" />
                </Link>
                <img src={item.img} />
                <h3>{item.name}</h3>
                <ul>
                    <li><Link to={item.website} rel="external" target="_blank">{s.projectWebsite}</Link></li>
                    <li>{item.description}</li>
                </ul>
            </div>);
        }
    }
}

ProjectDetails.propTypes = {
    strings: PropTypes.object.isRequired,
};

ProjectDetails.defaultProps = {
    strings: {
        projectWebsite: 'Project Website (opens in new window)',
    },
};

export default connect(stateToProps)(translate('ProjectDetails')(ProjectDetails));