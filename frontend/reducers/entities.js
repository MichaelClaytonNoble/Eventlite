import { combineReducers } from 'redux';
import usersReducer from './users'; 

const entitiesReducer = combineReducers({
  user: usersReducer
})

export default entitiesReducer;