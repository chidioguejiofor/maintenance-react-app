import { combineReducers } from 'redux';
import { login, signup } from './authReducer';

export default combineReducers({
  login,
  signup,
});
