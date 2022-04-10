import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './posts';

const Reducers = combineReducers({
  users: userReducer,
  posts: postReducer
});

export default Reducers;