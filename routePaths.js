module.exports = {
	'client': {
		//client-side routes, for now all assumed public
		'root': '/',
		'about': '/about',
		'aboutName': '/about/:name',
		'blogs': '/blogs',
		'blogsName': '/blogs/:name',
		'admin': '/admin',
		'adminHome': '/adminHome',
	},
	'serverAuthorized': {
		//server routes which require authentication
		'apiEditMembers': '/api/editMembers',
	},
};