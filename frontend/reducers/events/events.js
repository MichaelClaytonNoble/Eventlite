import {RECEIVE_CURRENT_EVENT, RECEIVE_EVENTS} from '../../actions/events';

const eventsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_CURRENT_EVENT:
      nextState[action.event.id] = action.event;
      return nextState;
    case RECEIVE_EVENTS:
      return Object.assign(nextState, action.events);
    default: 
      return state;
  };
}

export default eventsReducer;