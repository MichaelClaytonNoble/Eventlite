import {merge} from 'lodash'
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  RECEIVE_EMAIL_FOR_SESSION
} from '../actions/session';


let banana = {
  currentUser: {
    id: null
  },
  newSession: {
    emailExists: false
  }
};

//the previous state 
const sessionReducer = (state = banana, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      debugger
      //return  a slice of state where the current user's id is nested under id
      nextState.currentUser.id = action.user.id;
      nextState.newSession = {emailExists: false};
      return nextState;
    case RECEIVE_EMAIL_FOR_SESSION:
      nextState.newSession.emailExists = action.newSession.emailExists;
      return nextState;
    case LOGOUT_CURRENT_USER:

      //return the nullsession 
      return banana;
      // return {
      //   currentUser: {
      //     id: null},  
      //     newSession: {
      //       emailExists: 
      //       false } 
      //   }
    default:
      return state;
  }
};

//we need to go into the root reducer and add
// in the session reducer at the root level 
//then add the reducer to the 

export default sessionReducer;