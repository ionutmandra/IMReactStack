import SimpleGrid from '../components/simpleList';
import React, { Component } from 'react';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

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
                <Link to="/gsapr" className="pull-xs-right close-page">
                    gsapr
                </Link>

            </div>
        );
    }
}

export default Members;