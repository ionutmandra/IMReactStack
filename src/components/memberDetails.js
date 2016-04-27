import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import translate from '../hoc/translate';
import _ from 'lodash';
const routePaths = require('../../common/routePaths');

const stateToProps = state => ({
    items: state.team.members,
});

class MemberDetails extends Component {
    render() {
        const s = this.props.strings,
            key = this.props.params.key,
            items = this.props.items,
            index = _.findIndex(items, i => i.key == key),
            item = index >= 0 ? items[index] : null,
            link = routePaths.client.team.members;

        if (item != null) {
            return (<div className="project">
                <Link to={link} className="pull-xs-right close-page">
                    <i className="ncs-close" />
                </Link>
                <img src={item.img} />
                <h3>{item.name}</h3>
                <div className="font-italic">{item.position}</div>
            </div>);
        }
    }
}

MemberDetails.propTypes = {
    strings: PropTypes.object.isRequired,
};

MemberDetails.defaultProps = {
    strings: {
    },
};

export default connect(stateToProps)(translate('MemberDetails')(MemberDetails));