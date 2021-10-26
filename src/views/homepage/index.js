import React from 'react';
import TableComponent from '../../components/Table/index';
import TableDogs from '../../components/Table/TableDogs';
import { connect } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './index.css';
import { setCurrentUser } from '../../redux/user/user.actions';
import { setSports } from '../../redux/sports/sports.actions';
import { setDogs } from '../../redux/dogs/dogs.actions';
import { getUrl } from '../../services/index';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      chosenCategory: 'sports',
    };
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.user.currentUser,
    });
    const url = getUrl('sports');
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.props.setSports(response.data);
      });
  }

  handleExit = () => {
    this.props.setCurrentUser({ currentUser: null });
  };

  handleChangeCategory = (name) => () => {
    const url = getUrl(name);
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (name === 'dogs') {
          this.setState({ chosenCategory: 'dogs' });
          this.props.setDogs(response);
        }
        if (name === 'sports') {
          this.setState({ chosenCategory: 'sports' });
          this.props.setSports(response.data);
        }
      });
  };

  render() {
    const { currentUser, chosenCategory } = this.state;
    return (
      <div>
        <div className='mainImageContainer'>
          <div className='exitContainer' onClick={this.handleExit}>
            <ExitToAppIcon style={{ color: 'white' }} />
          </div>
          <div className='welcomeMessageContainer'>
            <h2>Hello {currentUser} !</h2>
            <div>
              Welcome to my world, here under you can find a list of all sports
              on the planet. It is the default choice but feel free to change
              it!
            </div>
          </div>
        </div>
        <div className='tableMainContainer'>
          <div className='titleContainer'>
            <h2>Table of items</h2>
          </div>
          <div className='categoriesContainer'>Choose a category</div>
          <div className='categoriesContainer'>
            <div
              className={`categoryItemContainer ${chosenCategory === 'sports' &&
                'selected'}`}
              onClick={this.handleChangeCategory('sports')}
            >
              sports
            </div>
            <div
              className={`categoryItemContainer ${chosenCategory === 'dogs' &&
                'selected'}`}
              onClick={this.handleChangeCategory('dogs')}
            >
              Dogs
            </div>
          </div>
          <div className='tableContainer'>
            {chosenCategory === 'dogs' && <TableDogs />}
            {chosenCategory === 'sports' && <TableComponent />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setSports: (sports) => dispatch(setSports(sports)),
  setDogs: (dogs) => dispatch(setDogs(dogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
