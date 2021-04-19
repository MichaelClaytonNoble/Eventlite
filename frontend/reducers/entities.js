import { combineReducers } from 'redux';
import usersReducer from './users'; 
import eventsReducer from './events/events';
import userEventsReducer from './events/user_events';
import categoriesReducer from './categories'; 
import featuredCollectionsReducer from './featured_collections';

const entitiesReducer = combineReducers({
  users: usersReducer,
  userEvents: userEventsReducer,
  events: eventsReducer,
  categories: categoriesReducer,
  featuredCollections: featuredCollectionsReducer
});

export default entitiesReducer;