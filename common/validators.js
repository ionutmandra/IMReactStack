//isomorphic form validation routines
module.exports = {
    contact,
};

function contact(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.message) {
        errors.message = 'Required';
    }
    return errors;
}