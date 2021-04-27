import {RECEIVE_CURRENT_USER} from '../../actions/users';
import {LOGOUT_CURRENT_USER} from '../../actions/session';

const usersReducer = (state={}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch( action.type){
    case RECEIVE_CURRENT_USER: 
      nextState[action.user.id] = action.user
      return nextState;
    case LOGOUT_CURRENT_USER:
      return {}
    default:
      return state;
  }
}

export default usersReducer;

