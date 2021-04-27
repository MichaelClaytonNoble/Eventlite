import {combineReducers} from 'redux';
import sessionReducer from './session/session';
import entitiesReducer from './entities';
import errorsReducer from './errorsReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  errors: errorsReducer,
  ui: uiReducer
});

export default rootReducer;