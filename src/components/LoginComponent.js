var React = require("react"),
ptypes = React.PropTypes,
ReactRedux = require("react-redux"),
Log = require("./log"),
actions = require("../actions"),
Link = require("react-router").Link;

var comp = React.createClass({
	propTypes: {
		
	},
	
	//customEvents
	handleUserChange:function(e){
		this.setState({ user: e.target.value })
	},
	handlePwdChange:function(e){
		this.setState({ password: e.target.value })
	},
	doLogin:function(){		
		this.props.doLogin(this.state.user,this.state.password);
	},
	testToken:function(){		
		this.props.testToken();
	},

	//lifecycle events
	render: function(){		
		var p = this.props.params;		

		return (
			<div>			
			<input type='text' placeholder='user' onChange={this.handleUserChange}/>
			<br />
			<input type='text' placeholder='password' onChange={this.handlePwdChange}/>
			<br />
			<input type='button' value='Login' onClick={this.doLogin} />
			<br />
			{ this.props.authState.isAuthenticated ? <Link to={"/adminHome"}>adminHome</Link> : null }
			{/*<input type='button' value='TestToken' onClick={this.testToken} />*/}
			</div>
			);
	}
});

const mapStateToProps = (state) =>{	
	return {
		authState: state.auth	
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		doLogin : (usr, pwd) => { dispatch(actions.doLogin(usr, pwd));},
		testToken : () => { dispatch(actions.testToken());},
	};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(comp);