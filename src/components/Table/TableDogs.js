import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  RowDetailState,
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../loader/index';

import { connect } from 'react-redux';
import './index.css';

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

const columnsDogs = [
  { name: 'img', title: 'Dog' },
  { name: 'name', title: 'Name' },
  { name: 'weight', title: 'Weight' },
  { name: 'height', title: 'Height' },
];

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

class TableDogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      loading: false,
      columns: 'dogs',
      totalCount: 0,
      currentPage: 0,
      lastQuery: '',
    };
    this.sports = [];
    this.dogs = [];
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dogs !== this.props.dogs) {
      this.setState({ totalCount: this.props.dogs.dogs.length });
    }
  }

  getQueryString = () =>
    `https://api.thedogapi.com/v1/breeds?limit=5&page=${this.state.currentPage}`;

  loadData = () => {
    const { lastQuery, loading } = this.state;
    const queryString = this.getQueryString();
    if (queryString !== lastQuery && !loading) {
      this.setState({ loading: true });
      fetch(queryString)
        .then((response) => response.json())
        .then((data) => {
          this.dogs = [];
          data.forEach((element) => {
            this.dogs.push({
              name: element.name,
              temperament: element.temperament,
              img: element.image.url,
              weight: element.weight.metric,
              height: element.height.metric,
              lifeSpan: element.life_span,
            });
          });
          this.setState({ rows: this.dogs, loading: false });
        })
        .catch(() => this.setState({ loading: false }));
      this.setState({ lastQuery: queryString });
    }
  };

  setCurrentPage = (page) => {
    this.setState({ currentPage: page }, () => this.loadData());
  };

  render() {
    const { rows, totalCount, currentPage, loading } = this.state;
    return (
      <div>
        <Paper>
          <Grid rows={rows} columns={columnsDogs}>
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.setCurrentPage}
              pageSize={5}
            />
            <RowDetailState />
            <CustomPaging totalCount={totalCount} />
            <Table cellComponent={CustomCellDogs} />
            <TableHeaderRow />
            <TableRowDetail contentComponent={RowDetailDogs} />
            <PagingPanel />
          </Grid>
          {loading && <Loading />}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sports: state.sports,
  dogs: state.dogs,
});

export default connect(mapStateToProps)(TableDogs);
