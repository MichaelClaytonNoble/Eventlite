import { CLEAR_FOLLOWS, RECEIVE_FOLLOW, RECEIVE_FOLLOWS, REMOVE_FOLLOW } from "../actions/follows";

const followsReducer = (state=[], action=[]) => {

  Object.freeze(state); 
  let nextState = Object.assign({}, state);

  switch(action.type){
    case RECEIVE_FOLLOWS:
      return action.follows;

    case RECEIVE_FOLLOW:
      return Object.values(nextState).push(action.follow);
    case CLEAR_FOLLOWS:
      return [];

    case REMOVE_FOLLOW:
      return Object.values(nextState).filter( follow => follow !== action.follow);

    default: 
      return state;
  }
};

export default followsReducer;