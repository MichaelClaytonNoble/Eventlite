import {combineReducers} from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import usersErrorsReducer from './users_errors_reducer';
import eventErrorsReducer from './events/event_errors';
import categoriesErrorsReducer from './categories_errors_reducer'; 

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: usersErrorsReducer,
  events: eventErrorsReducer,
  categories: categoriesErrorsReducer
});

export default errorsReducer;