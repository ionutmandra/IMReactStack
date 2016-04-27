import SimpleGrid from '../components/simpleList';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import translate from '../hoc/translate';
const routePaths = require('../../common/routePaths');

const stateToProps = state => ({
    items: state.team.members,
});

class Members extends Component {

    renderRow(item) {
        let link = routePaths.client.team.memberDetails.replace(':key', item.key);
        return (<Link to={link} className="member clearfix" activeClassName="active">
            <img src={item.img} className="pull-xs-left m-r-1" />
            <h4>{item.name} <i className="ncs-caret-right" /></h4>
            <span className="font-italic">{item.position}</span>
        </Link>);
    }

    render() {
        var p = this.props;
        let columns = this.props.children ? 6 : 12;
        return (
            <div className="members-list">
                <div className="row">
                    <div className={'col-sm-' + columns}>
                        <SimpleGrid
                            data = {p.items}
                            renderRow = {this.renderRow}
                            numberOfCellsPerRow = {1}
                            />
                    </div>
                    {this.props.children ?
                        <div className="col-sm-6">
                            {this.props.children}
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

export default connect(stateToProps)(translate('Members')(Members));