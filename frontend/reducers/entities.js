import { combineReducers } from 'redux';
import usersReducer from './users'; 
import eventsReducer from './events/events';
const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer
})

export default entitiesReducer;