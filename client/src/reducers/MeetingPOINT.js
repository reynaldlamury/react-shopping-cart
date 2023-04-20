/// =======================================
/// This file is meeting point of all reducers
/// =======================================
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import successReducer from './successReducer';
import resetPass from './resetPassReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
  success: successReducer,
  resetpass: resetPass,
});
