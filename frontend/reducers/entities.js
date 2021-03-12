import { combineReducers } from 'redux';
import usersReducer from './users'; 
import eventsReducer from './events/events';
import categoriesReducer from './categories'; 

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  categories: categoriesReducer,
})

export default entitiesReducer;