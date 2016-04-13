import ShowMore from './showMore';

var ReactPaginate = require('react-paginate'),
    React = require('react'),
    ptypes = React.PropTypes,
    _ = require('lodash');

class SimpleList extends React.Component {

    constructor(props) {
        super(props);

        this.onPaginationClick = this.onPaginationClick.bind(this);                
    }

    onPaginationClick(selectedPageDetails) {
        this.props.onPaginationClick(selectedPageDetails.selected);
    }

    drawRows() {

        var p = this.props;

        var cells = _.map(p.data, function(item) {
            return <span key={item.id}>{p.renderRow(item) }</span>;
        }, this);

        var rows = [];
        var cellIndex = 0;
        var rowIndex = 0;
        for (var i = 0; i < cells.length; i++) {
            if (!rows[rowIndex]) {
                rows[rowIndex] = [];
            }

            rows[rowIndex].push(cells[i]);

            cellIndex++;

            if (cellIndex == p.numberOfCellsPerRow) {
                cellIndex = 0;
                rowIndex++;
            }
        }

        var drawRows = _.map(rows, function(row, index) {
            return (<div key={index} className="sample-list-row">
                {row}
            </div>);
        }, this);

        return drawRows;
    }

    render() {

        var p = this.props;

        var showMore = p.useShowMore ?
            (<div className="simple-list-showMore">
                <ShowMore onShowMore={p.onShowMore}/>
            </div>) : null;

        var paginator = p.usePagination ?
            (<ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">{'...'}</a>}
                pageNum={p.pageNum}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                clickCallback={this.onPaginationClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />) : null;

        return (
            <div>
                <div className="simple-list-header">
                    {p.drawHead() }
                </div>
                <div className="simple-list-container">
                    {this.drawRows() }
                </div>
                <div className="simple-list-foooter">
                    {p.drawFooter() }
                </div>
                {showMore}
                {paginator}
            </div>
        );
    }
}

SimpleList.propTypes = {
    data: ptypes.array.isRequired,
};

SimpleList.defaultProps = {
    useShowMore: false,
    usePagination: false,
    numberOfCellsPerRow: 1,
    pageNum: 3,
    drawHead: function() { },
    drawFooter: function() { },
};

export default SimpleList;