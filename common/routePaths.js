module.exports = {
	'client': {
		//client-side routes, for now all assumed public
		'root': '/',
		'about': '/about',
		'aboutName': '/about/:name',
		'admin': '/admin',
		'adminHome': '/adminHome',
        'lists':'/lists',
        'contact': '/contact',
		'projects': '/projects',
		'services': '/services',
		'projectDetails': '/projects/:key',
	},
	'serverAuthorized': {
		//server routes which require authentication
		'apiEditMembers': '/api/editMembers',
	},
};