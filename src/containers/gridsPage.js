import SimpleGrid from '../components/simpleList';

var React = require('react'),
    ptypes = React.PropTypes,
    _ = require('lodash');

class GridsPage extends React.Component {

    constructor(props) {
        super(props);

        var items = [
            { id: 1, name: 'ionica' },
            { id: 2, name: 'marusica' },
            { id: 3, name: 'dorulica' },
            { id: 4, name: 'bogdanica' },
            { id: 5, name: 'laurica' },
            { id: 6, name: 'tudorica' },
        ];

        this.state = { items: items };
    }

    headerDrawer() {
        return (<span>{'this is header'}</span>);
    }

    renderRow(item) {
        return (<span>{item.name}</span>);
    }

    drawFooter() {
        return (<span>{'this is footer'}</span>);
    }

    onShowMore() {

        var newIndex = this.state.items.length + 1;

        var nextItems = this.state.items.concat({ id: newIndex, name: 'pu pu pu' });

        this.setState({ items: nextItems });
    }

    onPaginationClick(selectedPage){        

        console.log(selectedPage);

        var nextItems = this.state.items;

        nextItems.forEach(function(element) {
            element.name = element.name + ' page ' + selectedPage;
        }, this);        

        this.setState({ items: nextItems });
    }

    render() {

        return (

            <div>
                <p>{'This are some grid/list options'}</p>
                <div className="grids-page">
                    <SimpleGrid  data={this.state.items}
                        renderRow={this.renderRow}
                        drawHead={this.headerDrawer}
                        drawFooter={this.drawFooter}
                        numberOfCellsPerRow = {2}                        
                        useShowMore = {true}
                        onShowMore={this.onShowMore.bind(this)}
                        usePagination = {true} 
                        onPaginationClick = {this.onPaginationClick.bind(this)}
                        />
                </div>
            </div>
        );
    }
}

export default GridsPage;