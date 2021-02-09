
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session';

const _nullSession = {
  currentUser: null
};

//the previous state 
const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      //return  a slice of state where the current user 
      //is nested under the key currentUser
      return Object.assign({}, { currentUser: action.user });
    case LOGOUT_CURRENT_USER:
      //return the nullsession 
      return _nullSession;
    default:
      return state;
  }
};

//we need to go into the root reducer and add
// in the session reducer at the root level 
//then add the reducer to the 

export default sessionReducer;