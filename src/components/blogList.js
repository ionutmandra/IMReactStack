var React = require("react"),
ptypes = React.PropTypes,
ReactRedux = require("react-redux"),
Log = require("./log"),
actions = require("../actions"),
_ = require("lodash"),
Link = require("react-router").Link;
var rules = require('../businessRules/blogRules')();

var blogList = React.createClass({
	propTypes: componentPropsConstraints,
	handleChange:function(e){
		this.setState({ newItemText: e.target.value })
	},
	componentWillMount: function() {
		this.props.getInitialBlogs()		
	},
	render: function(){
		
		var p = this.props;		

		//test business rules
		var ok = rules.haveSameAuthor(p.blogState.blogList);
		console.log('rules check ',ok);

		var blogs = _.map(p.blogState.blogList,function(item){ 				
			return <div key={item.id}>
			{item.name}
			<Link to={"/blogs/" + item.name}>{item.name}</Link>
			<input type="button" value="removeBlog" onClick={p.removeBlog.bind(this, item.id)} />
			</div>;				
		},this);

		return (
			<div>
			{blogs}				
			<div className="blogAdd">
			<input type="text" onChange={this.handleChange}/><input type="button" value="Add Blog" onClick={p.addBlog.bind(this)} />
			</div>
			<div className="blogDetails">{this.props.children}</div>				
			</div>
			);
	}
});

var mapStateToProps = function(state){	return {blogState: state.blogs}};

var mapDispatchToProps = function(dispatch){
	return {
		addBlog: function(blog){ dispatch(actions.addBlog(this.state.newItemText)); },
		removeBlog: function(blog){dispatch(actions.removeBlog(blog)); },
		getInitialBlogs:function(){ dispatch(actions.getInitialBlogs()); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(blogList);

var componentPropsConstraints = {
	blogState: ptypes.shape({ 
		blogList: ptypes.array,
		blogsInfo: ptypes.object.isRequired
	}).isRequired,

	addBlog: ptypes.func.isRequired,
	removeBlog: ptypes.func.isRequired
};