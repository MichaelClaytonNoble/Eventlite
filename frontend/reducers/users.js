import {RECEIVE_NEW_USER} from '../actions/users';


const usersReducer = (state={}, action){

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch( action.type){

    case RECEIVE_NEW_USER: 
      nextState[action.user.id] = action.user
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;

