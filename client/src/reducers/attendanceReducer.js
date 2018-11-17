import { GET_LOG, SET_ATTENDANCE } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case GET_LOG:
    case SET_ATTENDANCE:
      return action.payload.data || false;
    default:
      return state;
  }
}