import {RECEIVE_TICKET_ERRORS} from '../../actions/tickets';
import {CLEAR_ERRORS} from '../../actions/events';

const ticketsErrorsReducer = (state=[], action) => {
  switch(action.type){
    case RECEIVE_TICKET_ERRORS:
      return action.errors
    case CLEAR_ERRORS:
      return [];
    default: 
      return state;
  };
};

export default ticketsErrorsReducer