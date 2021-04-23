import { combineReducers } from 'redux';
import usersReducer from './users'; 
import eventsReducer from './events/events';
import userEventsReducer from './events/user_events';
import categoriesReducer from './categories'; 
import featuredCollectionsReducer from './featured_collections';
import followsReducer from './follows';

const entitiesReducer = combineReducers({
  users: usersReducer,
  userEvents: userEventsReducer,
  events: eventsReducer,
  categories: categoriesReducer,
  featuredCollections: featuredCollectionsReducer,
  following: followsReducer
});

export default entitiesReducer;