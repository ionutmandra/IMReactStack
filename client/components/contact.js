import React, { Component } from 'react';
import Lorem from './lorem';

class Contact extends Component {
    render() {
        return (<article className="page-contact">
            <div className="image-container"><img src="client/dist/img/photos/temp5.jpg" /></div>
            <div className="gradient"></div>
            <div className="text-1"><h1>{'Contact us'}</h1></div>
        </article>);
    }
}

export default Contact;
