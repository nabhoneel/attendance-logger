import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reasonReducer from './reasonReducer';
import attendanceReducer from './attendanceReducer';

export default combineReducers({
  auth: authReducer,
  reason: reasonReducer,
  attendance: attendanceReducer
});