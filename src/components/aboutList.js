var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log");	
	actions = require("../actions");
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
	render: function(){
		
		var p = this.props;		

		var members = _.map(p.aboutState.members,function(item){ 
				//key should be added on components. If not components than add it to html
				return <div key={item.key}>
					{item.name}
					<Link to={"/about/" + item.name}>{item.name}</Link>
				</div>;
			// return <Battler key={name} name={name} doing={p.doing} kill={kill} duck={duck} />;
		},this);

		return (
			<div>
				{members}				
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
		addMember: function(member){ dispatch(actions.addMember(member)); },
		removeMember: function(member){ dispatch(actions.removeMember(member)); }		
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(aboutList);