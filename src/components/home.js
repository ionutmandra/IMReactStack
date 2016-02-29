var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log"),
	Battlers = require("./battlers"),
	actions = require("../actions"),
	Link = require("react-router").Link;

var Home = React.createClass({
	propTypes: {
			
	},
	render: function(){
		
		return (
			<div>
				<Link to={"/about"}>About</Link>
				<br />
				<Link to={"/blogs"}>Blogs</Link>
			</div>
		);
	}
});

// now we connect the component to the Redux store:
var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {battle:state.battlefield};
};

var mapDispatchToProps = function(dispatch){
	return {
		kill: function(killer,victim){ dispatch(actions.aimAt(killer,victim)); },
		duck: function(coward){ dispatch(actions.duckDown(coward)); },
		reset: function(){ dispatch(actions.reset()); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Home);
