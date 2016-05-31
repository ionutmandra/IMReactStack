import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
const routePaths = require('../../common/routePaths');

class Team extends Component {

    render() {
        var p = this.props, s = p.strings;
        return (
            <div className="section section--jobs">

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
                                <h1>Jobs page</h1>
                            </div>
                        </div>
                    </div>
                </div>
            {/*<div className="team-container">
                <h1>{s.team}</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to={routePaths.client.team.culture} className="nav-link" activeClassName="active">{s.culture}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routePaths.client.team.members} className="nav-link" activeClassName="active">{s.members}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routePaths.client.team.gallery} className="nav-link" activeClassName="active">{s.gallery}</Link>
                    </li>
                </ul>
                {this.props.children}*/}
            </div>
        );
    }
}

Team.propTypes = {
    strings: PropTypes.object.isRequired,
};

Team.defaultProps = {
    strings: {
        team: 'Team',
        culture: 'Culture',
        members: 'Members',
        gallery: 'Gallery',
    },
};

export default Team;