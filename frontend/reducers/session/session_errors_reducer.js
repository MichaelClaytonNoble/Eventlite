import {RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS} from '../../actions/session';

const sessionErrorsReducer = (state =[], action)=>{
  Object.freeze(state);

  const _nullSession = [];

  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors;

    case RECEIVE_CURRENT_USER: 
      return _nullSession;

    case CLEAR_ERRORS:
      return _nullSession;
      
    default:
      return state;
  }
}
export default sessionErrorsReducer;