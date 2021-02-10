import {combineReducers} from 'redux';
import sessionReducer from './session';
import entitiesReducer from './entities';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  errors: errorsReducer
});

export default rootReducer;