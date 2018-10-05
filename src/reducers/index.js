import { combineReducers } from 'redux';
import { login, signup } from './authReducer';
import uploadImageReducer from './uploadImageReducer';
import { requestReducer as currentRequest,
  loadRequestReducer as loadedRequest } from './requestReducer';

export default combineReducers({
  login,
  signup,
  image: uploadImageReducer,
  currentRequest,
  loadedRequest,

});
