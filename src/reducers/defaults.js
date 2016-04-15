//Default values for reducers
//Structure: reduce name => { default reducer data }
const defaults = {
    lang: {
        current: 'en',
    },
    projects: {
        items: [
            {
                key: 'adaptabi',
                name: 'Adaptabi',
                description: 'New company site',
                website: 'http://adaptabi.com',
                img: '/res/img/projects/adaptabi.png',
            },
            {
                key: 'safetybank',
                name: 'Safetybank',
                description: 'Best H&S system for construction companies',
                website: 'http://safetybank.co.uk',
                img: '/res/img/projects/safetybank.png',
            },
            {
                key: 'squires',
                name: 'Squires Kitchen',
                description: 'Largest kitchen supply store in UK',
                website: 'http://squires-shop.com',
                img: '/res/img/projects/squires.png',
            },
        ],
    },
};

export default defaults;
export let {lang, projects} = defaults;