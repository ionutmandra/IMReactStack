var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log"),
	actions = require("../actions"),
	_ = require("lodash"),
	Link = require("react-router").Link;

var aboutList = React.createClass({
	propTypes: {
		aboutState: ptypes.shape({ 
			members: ptypes.array,
			generalInfo: ptypes.object.isRequired
		}).isRequired,
		
		addMember: ptypes.func.isRequired,
		removeMember: ptypes.func.isRequired
	},
	handleChange:function(e){
		this.setState({ newItemText: e.target.value })
	},
	render: function(){
		
		var p = this.props;		

		var members = _.map(p.aboutState.members,function(item){ 
				//key should be added on components. If not components than add it to html
				return <div key={item.id}>
					{item.name}
					<Link to={"/about/" + item.name}>{item.name}</Link>
					<input type="button" value="removeMember" onClick={p.removeMember.bind(this, item.id)} />
				</div>;
				// return <Battler key={name} name={name} doing={p.doing} kill={kill} duck={duck} />;
		},this);

		return (
			<div>
				{members}				
				<div className="memberAdd">
					<input type="text" onChange={this.handleChange}/><input type="button" value="AddItem" onClick={p.addMember.bind(this)} />
				</div>
				<div className="memberDetails">				
					{this.props.children}
				</div>				
			</div>
		);
	}
});

var mapStateToProps = function(state){	
	return {
		aboutState: state.about		
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		addMember: function(member){ 
			dispatch(actions.addMember(this.state.newItemText)); },
		removeMember: function(member){ 			
			dispatch(actions.removeMember(member)); }		
	}
};


module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(aboutList);