module.exports = {
	'client': {
		//client-side routes, for now all assumed public
		'root': '/',
		'about': '/about',
		'expertise': '/expertise',
		'portfolio': '/portfolio',
		'portfolioDetails': '/portfolio/:key',
		'portfolioSfb': '/portfolio/sfb',		
		'portfolioSe': '/portfolio/se',		
		'careers': '/careers',
		'careerDetails': '/careers/:key',
		'contact': '/contact',
		'needHelp': '/need-help',
	},
	'serverAuthorized': {
		//server routes which require authentication
		'apiEditMembers': '/api/editMembers',
	},
};
