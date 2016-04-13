import React, { PropTypes as pt} from 'react';
import {reduxForm} from 'redux-form';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

const validate = require('../../common/validators').contact;
const fields = ['name', 'email', 'message'];

class Contact extends React.Component {
    submit(values, dispatch) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/api/contact', {
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
    render() {
        const {fields: {name, email, message}, handleSubmit} = this.props;
        return (
            <section className="page-contact">
                <h1>{'Contact'}</h1>
                <form onSubmit={handleSubmit(this.submit)}>
                    <div className={name.touched && name.error && 'has-error'}>
                        <input type="text" placeholder="Your name" {...name} />
                        {name.touched && name.error && <span>{name.error}</span>}
                    </div>
                    <div>
                        <input type="email" placeholder="Your e-mail" className={email.touched && email.error && 'has-error'} {...email} />
                        {email.touched && email.error && <span>{email.error}</span>}
                    </div>
                    <div>
                        <textarea placeholder="What's up?" className={message.touched && message.error && 'has-error'} {...message} />
                        {message.touched && message.error && <span>{message.error}</span>}
                    </div>
                    <button type="submit">{'Submit'}</button>
                </form>
            </section>
        );
    }
}

Contact = reduxForm({
    form: 'contact',
    fields,
    //toggle commenting the next line. Commented = will use server-side validation. Uncommented = will use client-side validation.
    validate,
})(Contact);

export default Contact;