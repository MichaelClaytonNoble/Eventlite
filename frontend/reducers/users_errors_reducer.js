
import {RECEIVE_USERS_ERRORS} from '../actions/users';

const usersErrorsReducer = (state=[], action) => {

  Object.freeze(state);

  switch( action.type ){
    case RECEIVE_USERS_ERRORS:
      return action.errors;
    default: 
      return state;
  }
}

export default usersErrorsReducer;