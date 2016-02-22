var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log");	

var aboutDetails = React.createClass({
	propTypes: {
		
	},
	render: function(){
		
		return (
			<div>
				about details		
			</div>
		);
	}
});

module.exports = ReactRedux.connect()(aboutDetails);
