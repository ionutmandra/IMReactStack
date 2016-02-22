var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Log = require("./log");	

var aboutDetails = React.createClass({
	propTypes: {
		params: ptypes.shape({name:ptypes.string.isRequired}).isRequired,
	},
	render: function(){		
		var p = this.props.params;		

		return (
			<div>
				Details for	{p.name}
			</div>
		);
	}
});

module.exports = ReactRedux.connect()(aboutDetails);