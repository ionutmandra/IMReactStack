var React = require("react"),
ptypes = React.PropTypes,
ReactRedux = require("react-redux"),
Log = require("./log");	

// var aboutDetails = React.createClass({
// 	propTypes: {
// 		params: ptypes.shape({name:ptypes.string.isRequired}).isRequired,
// 	},
// 	render: function(){		
// 		var p = this.props.params;		

// 		return (
// 			<div>
// 			Details for	{p.name}
// 			</div>
// 			);
// 	}
// });

// module.exports = aboutDetails;//ReactRedux.connect()(aboutDetails);

//EQUIVALENTS

class aboutDetails extends React.Component {
	

	render() {
		var p = this.props.params;	
		return (
			<div>
			Details for	{p.name}
			</div>
			)
	}
}

aboutDetails.propTypes = {
	params: ptypes.shape({name:ptypes.string.isRequired}).isRequired,
}

export default aboutDetails