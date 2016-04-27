import React, { Component } from 'react';
import { connect } from 'react-redux';

const stateToProps = state => ({
    culture: state.team.culture,
});

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

export default connect(stateToProps)(Culture);