import {RECEIVE_EVENTS_BY_USER, CLEAR_USER_EVENTS, REMOVE_EVENT} from '../../actions/events';

const userEventsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_EVENTS_BY_USER:
      if(action.events){
        return Object.assign(nextState, action.events)
      }
      return nextState;
    case REMOVE_EVENT:
      delete nextState[action.myId][action.event.id];
    return nextState;
    case CLEAR_USER_EVENTS:
      return {};
    default: 
      return state;
  };
}

export default userEventsReducer;