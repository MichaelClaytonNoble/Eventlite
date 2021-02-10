import { combineReducers } from 'redux';
import usersReducer from './users'; 

const entitiesReducer = combineReducers({
  users: usersReducer
})

export default entitiesReducer;