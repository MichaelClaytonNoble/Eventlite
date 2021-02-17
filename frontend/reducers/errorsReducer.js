import {combineReducers} from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import usersErrorsReducer from './users_errors_reducer';
import eventErrorsReducer from './events/event_errors';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: usersErrorsReducer,
  events: eventErrorsReducer
});

export default errorsReducer;