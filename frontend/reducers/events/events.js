import {RECEIVE_CURRENT_EVENT, RECEIVE_EVENTS, CLEAR_EVENTS} from '../../actions/events';

const eventsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_CURRENT_EVENT:
      nextState[action.event.id] = action.event;
      return nextState;
    case RECEIVE_EVENTS:
      return Object.assign(nextState, action.events);
    case CLEAR_EVENTS:
      return {};
    default: 
      return state;
  };
}

export default eventsReducer;