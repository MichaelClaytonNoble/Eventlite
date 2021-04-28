import * as ACTIONS from '../../actions/tickets';

const ticketsReducer = (state={}, action) => {

  let nextState = Object.assign({}, state); 
  Object.freeze(state); 

  switch(action.type){
    case ACTIONS.RECEIVE_TICKET:
      nextState[action.ticket.id] = action.ticket;
      return nextState;
    case ACTIONS.RECEIVE_TICKETS:
      nextState = Object.assign(nextState, action.tickets);
      return nextState;
    case ACTIONS.REMOVE_TICKET:
      delete nextState[action.ticket.id];
      return nextState;
    case ACTIONS.CLEAR_TICKETS:
      return {};
    default:
      return state;
  };

};

export default ticketsReducer;