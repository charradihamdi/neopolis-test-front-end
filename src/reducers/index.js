import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import eventReducer from "./event.reducer"


export default combineReducers({
  userReducer
});