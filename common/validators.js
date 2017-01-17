//isomorphic form validation routines
module.exports = {
    contact,
};

function contact(payload, field, errors) {
    var hasErrors = false, required = ['company', 'name', 'email', 'message', 'captcha'];
    errors = errors || {};
    if (field) {
        if (required.indexOf(field) >= 0) {
            if (!payload[field] || !payload[field].length) {
                errors[field] = 'This is required';
            } else {
                errors[field] = undefined;
            }
        }
        if (field == 'email' && !errors.email) {
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(payload.email)) {
                errors.email = 'Invalid address';
            } else {
                errors[field] = undefined;
            }
        }
        if (field == 'phone') {
            if (payload.phone && payload.phone.length && !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(payload.phone)) {
                errors.phone = 'Invalid phone number';
            } else {
                errors[field] = undefined;
            }
        }
    } else {
        required.forEach(function (field) {
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
    }
    return { hasErrors, errors };
}