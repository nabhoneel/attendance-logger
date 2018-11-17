import { FETCH_USER, CREATE_LOG } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case CREATE_LOG:
    case FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
}