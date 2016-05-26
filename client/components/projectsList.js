import SimpleGrid from '../components/simpleList';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class ProjectsList extends Component {

    renderRow(item) {
        let link = routePaths.client.projectDetails.replace(':key', item.key);
        return (<Link to={link} className="project clearfix" activeClassName="active">
            <img src={item.img} className="pull-xs-left m-r-1" />
            <h4>{item.name} <i className="ncs-caret-right" /></h4>
            <span className="font-italic">{item.description}</span>
        </Link>);
    }

    render() {
        var p = this.props, s = p.strings;
        let columns = this.props.children ? 6 : 12;
        return (
            <div className="projects-list">
                <h1>{s.projects}</h1>
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

ProjectsList.propTypes = {
    strings: PropTypes.object.isRequired,
};

ProjectsList.defaultProps = {
    strings: {
        projects: 'Projects',
    },
};

export default ProjectsList;