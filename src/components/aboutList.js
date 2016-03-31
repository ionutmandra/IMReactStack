import React, { PropTypes as ptypes} from 'react';
import ReactRedux from 'react-redux';
import Log from './log';
import actions from '../actions';
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

var mapStateToProps = function(state) {		
	return {
		aboutState: state.about,	
	};
};

var mapDispatchToProps = function(dispatch) {
	return {
		addMember: function(member) { 
			dispatch(actions.addMember(this.state.newItemText)); 
        },
		removeMember: function(member) { 			
			dispatch(actions.removeMember(member)); 
        },
		getInitialMembers:function() { 			
			dispatch(actions.getInitialMembers()); 
        },
	};
};

module.exports.rawComponent = aboutList;
module.exports.component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(aboutList);