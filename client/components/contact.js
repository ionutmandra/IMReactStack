import React, { Component } from 'react';

class Contact extends Component {
    submit(values, dispatch) { } //noop

    render() {
        const {fields: {name, email, message}, handleSubmit} = this.props;
        return (
            <section className="page-contact">
                <h1>{'Contact'}</h1>
                <form onSubmit={handleSubmit(this.submit) }>
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

export default Contact;
