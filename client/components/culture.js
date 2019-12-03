import React, { Component } from 'react';

class Culture extends Component {
    render() {
        var p = this.props;
        return (
            <div className="culture">
                {p.culture}
            </div>
        );
    }
}

export default Culture;