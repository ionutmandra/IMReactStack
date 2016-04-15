import React, { Component } from 'react';

class Page extends Component {
    render() {
        return <section className="page">{this.props.children}</section>;
    }
}

export default Page;