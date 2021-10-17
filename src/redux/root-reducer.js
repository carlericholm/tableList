import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import sportsReducer from './sports/sports.reducer'
import dogsReducer from './dogs/dogs.reducer'

export default combineReducers({
  user: userReducer,
  sports: sportsReducer,
  dogs: dogsReducer
});
