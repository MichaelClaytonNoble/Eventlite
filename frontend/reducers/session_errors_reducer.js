import {RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS} from '../actions/session';

const sessionErrorsReducer = (state =[], action)=>{
  Object.freeze(state);

  const orange = [];

  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors;

    case RECEIVE_CURRENT_USER: 
      return orange;

    case CLEAR_ERRORS:
      return orange;
      
    default:
      return state;
  }
}
export default sessionErrorsReducer;