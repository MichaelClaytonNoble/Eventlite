import {RECEIVE_EVENTS_BY_USER, CLEAR_USER_EVENTS, REMOVE_EVENT} from '../../actions/events';

const userEventsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_EVENTS_BY_USER:
      if(action.events){
        let events = Object.values(action.events);
        let creator_id = events[0].creator_id;
        return Object.assign(nextState, {[creator_id]: events})
      }
      return nextState;
    case REMOVE_EVENT:
      console.log(nextState);
      console.log(action.eventId);
    return nextState;
    case CLEAR_USER_EVENTS:
      return {};
    default: 
      return state;
  };
}

export default userEventsReducer;