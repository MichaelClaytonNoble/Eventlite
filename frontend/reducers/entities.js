import { combineReducers } from 'redux';
import usersReducer from './users'; 
import eventsReducer from './events/events';
import userEventsReducer from './events/user_events';
import categoriesReducer from './categories'; 

const entitiesReducer = combineReducers({
  users: usersReducer,
  userEvents: userEventsReducer,
  events: eventsReducer,
  categories: categoriesReducer,
});

export default entitiesReducer;