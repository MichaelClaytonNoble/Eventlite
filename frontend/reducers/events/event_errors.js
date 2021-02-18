import {RECEIVE_EVENT_ERRORS} from '../../actions/events';
import { CLEAR_ERRORS } from '../../actions/session';

const eventErrorsReducer = (state = [], action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch (action.type){
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default: 
      return state; 
  };
}

export default eventErrorsReducer; 
