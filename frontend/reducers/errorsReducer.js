import {combineReducers} from 'redux';
import sessionErrorsReducer from './session/session_errors_reducer';
import usersErrorsReducer from './users/users_errors_reducer';
import eventErrorsReducer from './events/event_errors';
import categoriesErrorsReducer from './categories/categories_errors_reducer'; 
import ticketsErrorsReducer from './tickets/tickets_errors';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: usersErrorsReducer,
  events: eventErrorsReducer,
  categories: categoriesErrorsReducer,
  tickets: ticketsErrorsReducer
});

export default errorsReducer;