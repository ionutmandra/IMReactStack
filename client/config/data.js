/*
This is the initial state of the Redux Store and default values for individual reduces

Structure: reducer name => { default reducer data }
*/
let data = {};

export const about = data.about = {
    membersInfo: { description: 'about description' },
    members: [],
};

export const auth = data.auth = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
};

export const lang = data.lang = {
    current: 'en',
};

export const projects = data.projects = {
    items: [
        // {
        //     key: 'adaptabi',
        //     name: 'Adaptabi',
        //     description: 'New company site',
        //     website: 'http://adaptabi.com',
        //     img: '/client/dist/img/projects/adaptabi.png',
        // },
        // {
        //     key: 'safetybank',
        //     name: 'Safetybank',
        //     description: 'Best H&S system for construction companies',
        //     website: 'http://safetybank.co.uk',
        //     img: '/client/dist/img/projects/safetybank.png',
        // },
        // {
        //     key: 'squires',
        //     name: 'Squires Kitchen',
        //     description: 'Largest kitchen supply store in UK',
        //     website: 'http://squires-shop.com',
        //     img: '/client/dist/img/projects/squires.png',
        // },
    ],
};

export const services = data.services = {
    items: [
        {
            key: 'innovation',
            name: 'Innovation',
            icon: 'cog',
            description: 'We boost startup recognition by creating unique, innovative apps!',
        },
        {
            key: 'maintenance',
            name: 'Maintenance',
            icon: 'save',
            description: 'We keep your project running at peak performance forever!',
        },
        {
            key: 'consulting',
            name: 'Consulting',
            icon: 'comments',
            description: 'Don\'t know how to make your dream idea come true? We do!',
        },
        {
            key: 'cooking',
            name: 'Cooking',
            icon: 'pie-chart',
            description: 'We\'ll slap you with the best pizza in town!',
        },
    ],
};

export const team = data.team = {
    culture: 'Lorem ipsum organizational culture text',
    members: [
        // {
        //     key: 'ionut',
        //     name: 'Ionut Mandra',
        //     img: '/client/dist/img/projects/safetybank.png',
        //     position: 'Developer',
        // },
        // {
        //     key: 'marius',
        //     name: 'Mihai-Marius Baciu',
        //     img: '/client/dist/img/projects/safetybank.png',
        //     position: 'Developer',
        // },
        // {
        //     key: 'teodor',
        //     name: 'Teodor Sandu',
        //     img: '/client/dist/img/projects/safetybank.png',
        //     position: 'Developer',
        // },
    ],
    gallery: [
        // {
        //     key: '1',
        //     img: '/client/dist/img/projects/adaptabi.png',
        // },
        // {
        //     key: '2',
        //     img: '/client/dist/img/projects/safetybank.png',
        // },
        // {
        //     key: '3',
        //     img: '/client/dist/img/projects/squires.png',
        // },
    ],
};

export const transition = data.transition = {
    type: false, //no initial transition
    scrollScenesEnabled: true, //initially all scroll scenes are enabled
};

export const ui = data.ui = {
    media: { //active media query (large, medium, small)
        current: 'none',
        prev: 'none',
    },
};

export default data;