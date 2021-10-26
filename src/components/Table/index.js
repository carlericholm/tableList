import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  RowDetailState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { connect } from 'react-redux';
import './index.css';

const RowDetailSports = ({ row }) => <div>{row.description}</div>;
const RowDetailDogs = ({ row }) => (
  <div className='detailRowContainer'>
    <div className='imageDetailContainer'>
      <img src={row.img} />
    </div>
    <div className='dogInfosContainer'>
      <div>
        <span className='fieldTitle'>Name:</span> {row.name}
      </div>
      <div>
        <span className='fieldTitle'>Life span:</span> {row.lifeSpan} years
      </div>
      <div>
        <span className='fieldTitle'>Height:</span> {row.height} cm
      </div>
      <div>
        <span className='fieldTitle'>Weight:</span> {row.weight} kg
      </div>
      <div>
        <span className='fieldTitle'>Temperament:</span> {row.temperament} 
      </div>
    </div>
  </div>
);

const columnsSport = [
  { name: 'icon', title: 'Icon' },
  { name: 'name', title: 'Sport' },
  { name: 'locale', title: 'Locale' },
  { name: 'id', title: 'Id' },
];

const columnsDogs = [
  { name: 'img', title: 'Dog' },
  { name: 'name', title: 'Name' },
  { name: 'weight', title: 'Weight' },
  { name: 'height', title: 'Height' },
];

const CustomCellSports = (cell) => {
  let content = cell.value;
  if (cell.column.name === 'icon') {
    content = (
      <div className='iconContainer'>
        {cell.value !== null ? <img src={cell.value} alt='icon' /> : 'No data'}
      </div>
    );
  }

  return <Table.Cell style={cell.style}>{content}</Table.Cell>;
};

const CustomCellDogs = (cell) => {
  let content = cell.value;
  if (cell.column.name === 'img') {
    content = (
      <div className='imgDogContainer'>
        <img src={cell.value} />
      </div>
    );
  }

  return <Table.Cell style={cell.style}>{content}</Table.Cell>;
};

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columns: 'sports',
    };
    this.sports = [];
    this.dogs = [];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sports !== this.props.sports) {
      this.sports = [];
      this.props.sports.sports.forEach((element) => {
        this.sports.push({
          name: element.attributes.name,
          locale: element.attributes.locale,
          icon: element.attributes.icon,
          id: element.id,
          description: element.attributes.description,
        });
      });
      this.setState({ rows: this.sports, columns: 'sports' });
    }
    if (prevProps.dogs !== this.props.dogs) {
      this.dogs = [];
      this.props.dogs.dogs.forEach((element) => {
        this.dogs.push({
          name: element.name,
          temperament: element.temperament,
          img: element.image.url,
          weight: element.weight.metric,
          height: element.height.metric,
          lifeSpan: element.life_span,
        });
      });
      this.setState({ rows: this.dogs, columns: 'dogs' });
    }
  }

  render() {
    const { rows, columns } = this.state;
    let columnsToRender = [];
    let customCellToRender;
    let customRowDetailToRender;
    if (columns === 'sports') {
      columnsToRender = columnsSport;
      customCellToRender = CustomCellSports;
      customRowDetailToRender = RowDetailSports;
    } else if (columns === 'dogs') {
      columnsToRender = columnsDogs;
      customCellToRender = CustomCellDogs;
      customRowDetailToRender = RowDetailDogs;
    }
    return (
      <div>
        <Paper>
          <Grid rows={rows} columns={columnsToRender}>
            <PagingState defaultCurrentPage={0} pageSize={10} />
            <IntegratedPaging />
            <SortingState
              defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
            />
            <RowDetailState />
            <IntegratedSorting />
            <Table cellComponent={customCellToRender} />
            <TableHeaderRow  />
            <TableRowDetail contentComponent={customRowDetailToRender} />
            <PagingPanel />
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sports: state.sports,
  dogs: state.dogs,
});

export default connect(mapStateToProps)(TableComponent);
