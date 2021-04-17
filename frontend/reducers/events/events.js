import {RECEIVE_CURRENT_EVENT, RECEIVE_EVENTS, CLEAR_EVENTS,
  CLEAR_MY_EVENTS, REMOVE_EVENT} from '../../actions/events';

const eventsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_CURRENT_EVENT:
      nextState[action.event.id] = action.event;
      return nextState;
    case RECEIVE_EVENTS:
      return Object.assign(nextState, action.events);
    case REMOVE_EVENT: 
      delete nextState[action.eventId];
      return nextState;
    case CLEAR_MY_EVENTS:
      return Object.values(nextState).filter(event=>{
        return event.creator_id === action.id;
      });
    case CLEAR_EVENTS:
      return {};
    default: 
      return state;
  };
}

export default eventsReducer;