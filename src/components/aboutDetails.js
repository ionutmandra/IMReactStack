import React, { Component, PropTypes } from 'react';
import translate from '../hoc/translate';

class aboutDetails extends Component {
    render() {
        const name = this.props.strings.detailsFor(this.props.params.name);
        return <div>{name}</div>;
    }
}

aboutDetails.propTypes = {
    params: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    strings: PropTypes.object.isRequired,
};

aboutDetails.defaultProps = {
    strings: {
        detailsFor: name => 'Details for ' + name,
    },
};

export default translate('aboutDetails')(aboutDetails);