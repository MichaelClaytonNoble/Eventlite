import {RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER} from '../actions/session';

const sessionErrorsReducer = (state ={}, action)=>{
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      let nextState = Object.assign({}, state);
      nextState = {"errors": action.errors};
      return nextState;
    case RECEIVE_CURRENT_USER: 
      return {};
    default:
      return state;
  }
}
export default sessionErrorsReducer;