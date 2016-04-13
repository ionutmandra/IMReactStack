var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux");	

var blogDetails = React.createClass({
	propTypes: {
		
	},
	render: function(){
		
		return (
			<div>
				blog details		
			</div>
		);
	}
});

module.exports = ReactRedux.connect()(blogDetails);
