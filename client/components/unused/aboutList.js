import React, { PropTypes as ptypes} from 'react';
import _ from 'lodash';
import {Link} from 'react-router';

var aboutList = React.createClass({
	propTypes: {
		aboutState: ptypes.shape({
			members: ptypes.array,
			membersInfo: ptypes.object.isRequired,
		}).isRequired,

		addMember: ptypes.func.isRequired,
		removeMember: ptypes.func.isRequired,
	},
	componentWillMount: function() {
		this.props.getInitialMembers();
	},
    handleChange: function(e) {
		this.setState({ newItemText: e.target.value });
	},
	render: function() {
		const p = this.props;
		const members = _.map(p.aboutState.members, function(item) {
			return (
                <div key={item.id}>
                    {item.name}
                    <Link to={'/about/' + item.name}>{item.name}</Link>
                    <input type="button" value="removeMember" onClick={p.removeMember.bind(this, item.id)} />
                </div>
            );
		},this);

		return (
			<div>
				{members}
				<div className="memberAdd">
					<input type="text" onChange={this.handleChange}/>
                    <input type="button" value="AddItem" onClick={p.addMember.bind(this)} />
				</div>
				<div className="memberDetails">
					{this.props.children}
				</div>
			</div>
		);
	},
});

module.exports.component = aboutList;
