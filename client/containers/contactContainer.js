import {reduxForm} from 'redux-form';
import fetch from 'isomorphic-fetch';
import { contact as validate } from '../../common/validators';
import Contact from '../components/contact';

require('es6-promise').polyfill();

const fields = ['name', 'email', 'message'];

class ContactContainer extends Contact {
    submit(values, dispatch) {
        return new Promise((resolve, reject) => {
            fetch('/api/contact', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(response => {
                    response.success && resolve() || reject(response.errors);
                });
        });
    }
}

ContactContainer = reduxForm({
    form: 'contact',
    fields,
    //toggle commenting the next line. Commented = will use server-side validation. Uncommented = will use client-side validation.
    validate,
})(ContactContainer);

export default ContactContainer;
