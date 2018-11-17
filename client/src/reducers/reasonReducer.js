import { GET_REASON, SET_REASON } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case SET_REASON:
    case GET_REASON:
      return action.payload.data || false;
    default:
      return state;
  }
}