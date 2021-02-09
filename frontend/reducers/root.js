import {combineReducers} from 'redux';
import sessionReducer from './session';
import entitiesReducer from './entities';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer
});

export default rootReducer;