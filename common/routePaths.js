module.exports = {
	'client': {
		//client-side routes, for now all assumed public
		'root': '/',
		'about': '/about',
		'expertise': '/expertise',
		'portfolio': '/portfolio',
		'portfolioDetails': '/portfolio/:key',
		'portfolioSfb': '/portfolio/sfb',		
		'careers': '/careers',
		'careerDetails': '/careers/:key',
		'contact': '/contact',
		'needHelp': '/need-help',
		// 'aboutName': '/about/:name',
		// 'admin': '/admin',
		// 'adminHome': '/adminHome',
        // 'lists':'/lists',
        // 'contact': '/contact',
		// 'gallery': '/galleryExample',
		// 'projects': '/projects',
		// 'services': '/services',
		// 'projectDetails': '/projects/:key',
		// 'gsap':'/gsap',
		// 'gsapr':'/gsapr',
		// 'team': {
		// 	'index': '/team',
		// 	'culture': '/team/culture',
		// 	'members': '/team/members',
		// 	'memberDetails': '/team/members/:key',			
		// 	'gallery': '/team/gallery',
		// },
	},
	'serverAuthorized': {
		//server routes which require authentication
		'apiEditMembers': '/api/editMembers',
	},
};
