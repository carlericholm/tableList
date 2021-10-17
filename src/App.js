import React from 'react';
import HomePage from './views/homepage/index';
import LoginPage from './views/loginPage/index';
import { connect } from 'react-redux';
import TableComponent from './components/Table/index';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        currentUser: this.props.user.currentUser,
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    return <div>{currentUser ? <HomePage /> : <LoginPage />}</div>;
  }
}
const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(App);
