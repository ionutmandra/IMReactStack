var React = require('react'),
    ptypes = React.PropTypes,
    _ = require('lodash');

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
    onShowMore: ptypes.func.isRequired,
};

export default ShowMore;
