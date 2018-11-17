import axios from 'axios';

import { CREATE_LOG, FETCH_USER, SET_REASON, GET_REASON, GET_LOG, SET_ATTENDANCE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch( { type: FETCH_USER, payload: res } );
};

export const createLog = () => async dispatch => {
  console.log('attempting to create/update log...');
  const res = await axios.post('/api/create_current_log');
  dispatch( { type: CREATE_LOG, payload: res } );
};

export const getReason = () => async dispatch => {  
  const res = await axios.get('/api/reason');  
  dispatch( { type: GET_REASON, payload: res } );
};

export const setReason = (reason) => async dispatch => {
  const res = await axios.post('/api/reason', {reason: reason});
  dispatch( { type: SET_REASON, payload: res} );
};

export const fetchLog = () => async dispatch => {
  const res = await axios.get('/api/get_current_log');
  dispatch( { type: GET_LOG, payload: res } );
};

export const setAttendance = (choice) => async dispatch => {
  const res = await axios.post('/api/student', {going: choice});
  dispatch( { type: SET_ATTENDANCE, payload: res } );
};