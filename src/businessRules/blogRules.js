//dependencies as params
module.exports = function(){

//private vars

return {

	isValid:function(){
		return true;
	},


	author:function(blog)	{
		return blog.name;		
	},


	haveSameAuthor:function(blogs){

		if(!blogs) return false;

		if( Object.prototype.toString.call(blogs) != "[object Array]"){
			return false;
		}

		if(!blogs.length) return false;

		var initialAuthor = blogs[0].name;

		blogs.forEach(function(blog){
			if(blog.name != initialAuthor){
				return false;
			}
		},this);

		return true;
	}

};

};