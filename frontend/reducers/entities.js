import { combineReducers } from 'redux';
import usersReducer from './users/users'; 
import eventsReducer from './events/events';
import userEventsReducer from './events/user_events';
import categoriesReducer from './categories/categories'; 
import featuredCollectionsReducer from './featured_collections';
import followsReducer from './follows';
import ticketsReducer from './tickets/tickets';

const entitiesReducer = combineReducers({
  users: usersReducer,
  userEvents: userEventsReducer,
  events: eventsReducer,
  categories: categoriesReducer,
  featuredCollections: featuredCollectionsReducer,
  following: followsReducer,
  tickets: ticketsReducer
});

export default entitiesReducer;