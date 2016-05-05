var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
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
				<br />
        <Link to={"/contact"}>Contact</Link>
				<br />
				{/* <Link to={"/admin"}>Authenticate</Link> */}
				<Link to={"/galleryExample"}>Gallery Example</Link>
				<br/>
			</div>
		);
	},
});


module.exports = ReactRedux.connect()(Home);
