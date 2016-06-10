import React, { Component } from 'react';
import Lorem from './lorem';

class Contact extends Component {
    submit(values, dispatch) { } //noop

    render() {
        //const {fields: {name, email, message}, handleSubmit} = this.props;
        return (
             <article className="page-contact">
                <header>
                    <div className="image-container"><img src="client/dist/img/photos/temp5.jpg" /></div>
                    <div className="gradient"></div>
                    <div className="text-1"><h1>{'Contact us'}</h1></div>
                </header>
                <section>
                    <Lorem />
                </section>
            {/*<div className="section section--contact">

                <div className="image-to-back-wrap">
                    <div className="image-to-back">
                        <img src="client/dist/img/photos/temp1.jpg" data-ref="background" />
                    </div>
                </div>
                <div className="gradient" data-ref="gradient"></div>
                <div className="section-content">
                    <div className="grid-block-wrap">
                        <div className="grid-block">
                            <div className="grid-block-content" data-ref="text1">
                                <h1>Contact page</h1>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>*/}
            </article>
        );
    }
}

export default Contact;
