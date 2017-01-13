//isomorphic form validation routines
module.exports = {
    contact,
};

function contact(payload) {
    let hasErrors = false, errors = {};
    ['company', 'name', 'email', 'message', 'captcha'].forEach(function (field) {
        if (!payload[field] || !payload[field].length) {
            hasErrors = true;
            errors[field] = 'This is required';
        }
    }, this);
    if (!errors.email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(payload.email)) {
        hasErrors = true;
        errors.email = 'Invalid address';
    }
    if (payload.phone && payload.phone.length && !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(payload.phone)) {
        hasErrors = true;
        errors.phone = 'Invalid phone number';
    }
    return { hasErrors, errors };
}