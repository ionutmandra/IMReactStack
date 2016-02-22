var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log");	

var blogList = React.createClass({
	propTypes: {
		
	},
	render: function(){
		
		return (
			<div>
				blog list
				<input type="button" value="showDetails"/>
				{this.props.children}
			</div>
		);
	}
});

module.exports = ReactRedux.connect()(blogList);
