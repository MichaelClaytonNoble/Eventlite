import {RECEIVE_CURRENT_USER} from '../actions/users';


const usersReducer = (state={}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch( action.type){

    case RECEIVE_CURRENT_USER: 
      nextState[action.user.id] = action.user
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;

