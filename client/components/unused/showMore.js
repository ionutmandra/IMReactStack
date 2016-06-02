import React, { PropTypes } from 'react';

class ShowMore extends React.Component {
    render() {
        var p = this.props;
        return (
            <div>
                <div className="simple-list-header">
                    <span onClick={p.onShowMore.bind(this)}>
                        {'Show More ...'}
                    </span>
                </div>
            </div>
        );
    }
}

ShowMore.propTypes = {
    onShowMore: PropTypes.func.isRequired,
};

export default ShowMore;
