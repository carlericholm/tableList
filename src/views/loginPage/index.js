import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import './index.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.setCurrentUser({ currentUser: this.state.name });
  };

  render() {
    return (
      <div className='loginMainContainer'>
        <div className='loginContainer'>
          <div className='titleContainer'>
            <h2>
              Hello and welcome !<br />
              what is your name ?{' '}
            </h2>
          </div>
          <div className='nameContainer'>
            <TextField
              id='standard-basic'
              label='Your name'
              variant='standard'
              style={{ width: '100%' }}
              onChange={this.handleChange}
            />
          </div>
          <div className='submitContainer'>
            <Button variant='contained' onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
